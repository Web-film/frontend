import TitleListFilm from "@/components/common/titleListFilm/TitleListFilm";
import SlideFilm from "@/components/features/slideFilm/SlideFilm";
import { FilmType } from "@/lib/service";

function ListFilm({
  classNameSlide,
  films,
  title,
}: {
  classNameSlide?: string;
  films: FilmType[];
  title?: string;
}) {
  return (
    <div className="relative list-film flex justify-between items-center gap-6">
      <TitleListFilm
        title={title || "Top 10 bộ phim thịnh hành"}
        href="/"
        bgText="var(--bg-text-title)"
      />
      <SlideFilm classNameSlide={classNameSlide} films={films} />
    </div>
  );
}

export default ListFilm;
