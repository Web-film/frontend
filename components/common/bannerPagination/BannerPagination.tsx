import { FilmType } from "@/lib/service";

function BannerPagination({ film }: { film: FilmType }) {
  return (
    <div className="banner-item rounded-[0.5rem]">
      <img src={film.backdrop_path} alt={film.title} className="absolute inset-0 h-full w-full object-cover rounded-[0.5rem]" />
    </div>
  );
}

export default BannerPagination;
