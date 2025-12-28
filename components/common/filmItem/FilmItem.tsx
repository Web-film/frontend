import { FilmType } from "@/lib/service";
import { PlayIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

export default function FilmItem({ film }: { film: FilmType }) {
  const imageSrc = film.poster_path?.trim()
    ? film.poster_path
    : film.backdrop_path?.trim()
      ? film.backdrop_path
      : null;

  return (
    <div className="">
      <div className="h-0 pb-[60%] overflow-hidden relative">
        <img
          src={imageSrc}
          alt={film.title}
          className="absolute inset-0 w-full h-full object-cover rounded-xl"
        />
      </div>
      <div className="p-4 space-y-2">
        <Link href={`/film/${film.id}`}>
          <h3 className="text-white font-semibold line-clamp-1 hover:text-[var(--primary-text)]">
            {film.title}
          </h3>
        </Link>

        <p className="text-sm text-gray-400 line-clamp-3 min-h-[60px] ">
          {film.overview}
        </p>

        <div className="flex items-center gap-2 pt-2">
          <Link
            href={`/film/${film.id}`}
            className="px-3 py-2 bg-primary min-h-[2.5rem] flex items-center rounded-md text-sm bg-[var(--primary-color)] rounded-md text-[var(--text-black)] hover:bg-[var(--primary-color-hover)]"
          >
            <PlayIcon className="w-4 h-4 min-w-4 min-h-4 mr-2" />
            Xem ngay
          </Link>
          <Link
            href={`/film/${film.id}`}
            className="px-3 py-2 border border-gray-600 min-h-[2.5rem] flex items-center rounded-md text-sm hover:text-[var(--primary-text)]"
          >
            Chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
}
