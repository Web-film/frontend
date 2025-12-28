import envConfig from "@/next.config";

export type CustomOptions = Omit<RequestInit, "method"> & {
  baseUrl?: string;
};

export type HttpResponse<T> = {
  status: number;
  payload: T;
};

export type EntityErrorPayload = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
};

export class HttpError<T = unknown> extends Error {
  status: number;
  payload: T;

  constructor(status: number, payload: T, message = "Http Error") {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

export class EntityError extends HttpError<EntityErrorPayload> {
  constructor(payload: EntityErrorPayload) {
    super(422, payload, payload.message);
  }
}

async function request<Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptions & { body?: unknown }
) {
  const isFormData = options?.body instanceof FormData;

  const headers: HeadersInit = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...options?.headers,
  };

  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl;

  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const body: BodyInit | null | undefined =
    options?.body == null
      ? null
      : isFormData
        ? options.body
        : JSON.stringify(options.body);

  const res = await fetch(fullUrl, {
    method,
    headers,
    body,
  });

  const payload: Response = await res.json();

  if (!res.ok) { 
    return {status: res.status, payload: null, mess: 'Lỗi khi fetch dữ liệu'}
  }

  return { status: res.status, payload };
}

const http = {
  get<Response>(url: string, options?: CustomOptions) {
    return request<Response>("GET", url, options);
  },

  post<Response>(url: string, body?: unknown, options?: CustomOptions) {
    return request<Response>("POST", url, { ...options, body });
  },

  put<Response>(url: string, body?: unknown, options?: CustomOptions) {
    return request<Response>("PUT", url, { ...options, body });
  },

  delete<Response>(url: string, options?: CustomOptions) {
    return request<Response>("DELETE", url, options);
  },
};

export default http;
