import http from "@/lib/http";

export type Genre = {
  id: number;
  name: string;
};

export async function getGenres(): Promise<Genre[]> {
  const res = await http.get<Genre[]>("/genres", {
    baseUrl: "http://localhost:3001",
    cache: "no-store",
  });

  return res.payload;
}
