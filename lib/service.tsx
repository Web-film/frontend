import http from "@/lib/http";

export type Genre = {
  id: number;
  name: string;
};

export type seasonType = {
  id: number;
  tmdb_season_id: number;
  film_id: number;
  season_number: number;
  name: string;
  overview: string;
  poster_path: string;
  air_date: string;
  episode_count: number;
};

export type GenreIncludes = {
  film_id: number;
  genre_id: number;
  genre: Genre;
};

export type FilmType = {
  id: number;
  tmdb_id: number;
  title?: string;
  original_title?: string;
  slug?: string;
  overview?: string;
  poster_path?: string;
  backdrop_path?: string;
  release_date?: null;
  type?: string;
  status?: string;
  rating?: number;
  vote_count?: number;
  popularity?: number;
  runtime?: null;
  views?: number;
  trailer_key?: string;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
  directors?: JSON | null;
  cast?: JSON | null;
  genres?: GenreIncludes[];
};

export type FilmResponse = {
  data: {
    items: FilmType[];
    pagination?: {
      total?: number;
      page?: number;
      limit?: number;
      totalPages: number;
      hasNextPage: boolean;
    };
  };
};

export type FilmDetailResponse = {
  data: FilmType;
};

export type seasonTypeResponse = {
  data: seasonType;
};

export async function getGenres(): Promise<Genre[]> {
  const res = await http.get<Genre[]>("/genres", {
    baseUrl: "http://localhost:3001",
    cache: "no-store",
  });

  return res.payload;
}

export async function getFilm(
  limit: number,
  page: number,
  type: string
): Promise<FilmType[]> {
  const res = await http.get<FilmResponse>(
    `/films?limit=${limit}&page=${page}&type=${type}`,
    {
      baseUrl: "http://localhost:3001",
      cache: "no-store",
    }
  );
  return res.payload?.data?.items || [];
}

export async function getNew(limit: number, page: number): Promise<FilmType[]> {
  const res = await http.get<FilmResponse>(
    `/films/new?limit=${limit}&page=${page}`,
    {
      baseUrl: "http://localhost:3001",
      cache: "no-store",
    }
  );
  return res.payload?.data?.items || [];
}

export async function getBanners(
  limit: number,
  page: number
): Promise<FilmType[]> {
  const res = await http.get<FilmResponse>(
    `/films/newUpdate?limit=${limit}&page=${page}`,
    {
      baseUrl: "http://localhost:3001",
      cache: "no-store",
    }
  );
  return res.payload?.data?.items || [];
}

export async function getPopular(
  limit: number,
  page: number
): Promise<FilmType[]> {
  const res = await http.get<FilmResponse>(
    `/films/popular?limit=${limit}&page=${page}`,
    {
      baseUrl: "http://localhost:3001",
      cache: "no-store",
    }
  );
  return res.payload?.data?.items || [];
}

export async function getDetailFilm(id: number): Promise<FilmType> {
  const res = await http.get<FilmDetailResponse>(`/films/${id}`, {
    baseUrl: "http://localhost:3001",
    cache: "no-store",
  });
  return res.payload?.data || {};
}

export async function getSeasonByFilm(film_id: number): Promise<seasonType> {
  const res = await http.get<seasonTypeResponse>(
    `/seasons/getSeasonsByFilm?film_id=${film_id}`,
    {
      baseUrl: "http://localhost:3001",
      cache: "no-store",
    }
  );
  return res.payload?.data || {};
}
