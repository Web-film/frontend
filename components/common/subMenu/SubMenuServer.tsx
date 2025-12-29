import { Genre, getGenres } from "@/lib/service";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SubMenuServer() {
  
  const [genres, setGenres] = useState<Genre[]>([]);
  
  useEffect(() => {
    async function fetchGenres() {
      const data = await getGenres();
      setGenres(data);
    }
    fetchGenres();
  }, []);

  return (
    <div className="absolute left-0 top-full mt-2 bg-[var(--bg-navbar)] rounded-md shadow-lg p-2 z-50 w-max">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 text-sm">
        {genres.map((genre) => (
          <Link
            key={genre.id}
            href={`/list/${genre.id}/${genre.name}`}
            className="flex items-center px-1.5 py-1 hover:text-[var(--primary-text)] hover:bg-[var(--bg-hover-navbar)] rounded-lg w-[140px]"
          >
            {genre.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
