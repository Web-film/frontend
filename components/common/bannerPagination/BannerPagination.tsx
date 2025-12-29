import { FilmType } from "@/lib/service";

function BannerPagination({ film }: { film: FilmType }) {
  const imgSrc = film.backdrop_path || film.poster_path || undefined;
  return (
    <div className="banner-item rounded-[0.5rem]">
      <img src={imgSrc} alt={film.title} className="absolute inset-0 h-full w-full object-cover rounded-[0.5rem]" />
    </div>
  );
}

export default BannerPagination;
