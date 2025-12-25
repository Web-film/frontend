import { FilmType } from "@/lib/service";
import { PlayIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

function BannerPagination({ film }: { film: FilmType }) {
  return (
    <div className="banner-item rounded-[0.5rem]">
      <img src={film.poster_path} alt={film.title} className="absolute inset-0 h-full w-full object-cover rounded-[0.5rem]" />
    </div>
  );
}

export default BannerPagination;
