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
  film?: FilmType;
};

export type episodeType = {
  id: number;
  tmdb_episode_id: number;
  season_id: number;
  episode_number: number;
  name: string;
  overview: string;
  runtime: number;
  air_date: string;
  video_key: string;
  still_path: string;
  views: number;
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

export type FilmListType = {
  items: FilmType[];
  pagination?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
    hasNextPage?: boolean;
  };
};

export type FilmDetailResponse = {
  data: FilmType;
};

export type FilmTypeResponse = {
  data: {
    items: FilmType | FilmType[];
  };
};

export type seasonTypeResponse = {
  data: {
    items: seasonType;
  };
};

export type episodeItemTypeResponse = {
  data: {
    items: episodeType;
  };
};

export type episodeTypeResponse = {
  data: episodeType;
};

export type seasonManyTypeResponse = {
  data: {
    items: seasonType[];
  };
};

export type episodeManyTypeResponse = {
  data: episodeType[];
};

export async function getGenres(): Promise<Genre[]> {
  const res = await http.get<Genre[]>("/genres", {
    baseUrl: "http://localhost:3001",
    cache: "no-store",
  });

  return res.payload;
}

export async function getFilm(params: {
  limit?: number;
  page?: number;
  type?: string;
  genreId?: string;
  search?: string;
}): Promise<FilmListType> {
  const query = new URLSearchParams();

  if (params.limit) query.append("limit", String(params.limit));
  if (params.page) query.append("page", String(params.page));
  if (params.type) query.append("type", params.type);
  if (params.search) query.append("search", params.search);
  if (params.genreId) query.append("genreId", params.genreId);

  const res = await http.get<FilmResponse>(`/films?${query.toString()}`, {
    baseUrl: "http://localhost:3001",
    cache: "no-store",
  });

  return {
    items: res.payload?.data?.items || [],
    pagination: {
      total: res?.payload?.data?.pagination?.total || 0,
      page: res?.payload?.data?.pagination?.total || 1,
      limit: res?.payload?.data?.pagination?.total || 0,
      totalPages: res?.payload?.data?.pagination?.total || 1,
      hasNextPage: res?.payload?.data?.pagination?.hasNextPage || false,
    },
  };
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

export async function getSeasonByFilm(film_id: number): Promise<seasonType[]> {
  const res = await http.get<seasonTypeResponse>(
    `/seasons/getSeasonsByFilm?film_id=${film_id}`,
    {
      baseUrl: "http://localhost:3001",
      cache: "no-store",
    }
  );
  return res.payload?.data || [];
}

export async function getSeasonById(season_id: number): Promise<seasonType> {
  const res = await http.get<seasonTypeResponse>(`/seasons/${season_id}`, {
    baseUrl: "http://localhost:3001",
    cache: "no-store",
  });
  return res.payload?.data?.items || {};
}

export async function getEpisodeBySeason(
  season_id: number
): Promise<episodeType[]> {
  const res = await http.get<episodeManyTypeResponse>(
    `/episodes/getEpisodeBySeason?season_id=${season_id}`,
    {
      baseUrl: "http://localhost:3001",
      cache: "no-store",
    }
  );
  return res.payload?.data || [];
}

export async function checkEpisode(
  season_id: number,
  episode_id: number
): Promise<seasonType> {
  const res = await http.get<any | null>(
    `/seasons/checkEpisode?season_id=${season_id}&episode_id=${episode_id}`,
    {
      baseUrl: "http://localhost:3001",
      cache: "no-store",
    }
  );

  return res.payload || null;
}

export async function increaseViewMovie(
  film_id: number
): Promise<FilmType | null> {
  const res = await http.put<FilmTypeResponse>(
    `/films/increaseView/${film_id}`,
    {
      baseUrl: "http://localhost:3001",
      cache: "no-store",
    }
  );

  return res.payload?.data?.items || null;
}

export async function increaseViewTv(
  episode_id: number
): Promise<episodeType | null> {
  const res = await http.put<episodeItemTypeResponse>(
    `/episodes/increaseView/${episode_id}`,
    {
      baseUrl: "http://localhost:3001",
      cache: "no-store",
    }
  );

  return res.payload?.data?.items || null;
}
