import Genres from "@/components/common/genres/Genres";
import { FilmType } from "@/lib/service";
import { PlayIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

function BannerItem({ film }: { film: FilmType }) {
  return (
    <div className="banner-item relative w-full h-full min-h-[500px] rounded-lg overflow-hidden">
      <div
        className="background absolute inset-0 bg-cover bg-center bg-no-repeat h-full w-full bg-position-[50%] bg-cover opacity-20"
        style={{ backgroundImage: `url(${film.poster_path})` }}
      ></div>
      <div className="overlay z-5 relative max-w-[700px] w-full py-[100px] px-[50px] mt-[50px]">
        <Link href={`/film/${film.id}`}>
          <h2 className="text-[var(--primary-color)]">{film.title}</h2>
        </Link>
        {film.genres && (
         <Genres genres={film.genres} />
        )}
        <span className="inline-block text-shadow-[var(--text-shadow)] mb-[2rem] text-white">
          {film.overview}
        </span>
        <Link href={`/film/${film.id}`} className="cursor-pointer h-[70px] w-[70px] min-h-[70px] min-w-[70px] rounded-[50%] flex items-center justify-center bg-[#fecf59ff] hover:shadow-[var(--text-shadow-hover)] hover:opacity-100 opacity-90">
          <PlayIcon className="h-[29px] w-[21px] scale-125 text-black" />
        </Link>
      </div>
    </div>
  );
}

export default BannerItem;
