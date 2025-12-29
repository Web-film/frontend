import Genres from "@/components/common/genres/Genres";
import FilmTv from "@/components/features/filmTv/FilmTv";
import {
  episodeType,
  FilmType,
  getDetailFilm,
  getEpisodeBySeason,
  getSeasonByFilm,
  seasonType,
} from "@/lib/service";
import { PlayIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { number } from "zod";

async function Film({ params }: { params: { id: string } }) {
  const { id } = await params;
  const film = await getDetailFilm(Number(id));
  let getSeasonByFilms: seasonType[] | null = null;
  let getEpisodeBySeasons: episodeType[] | null = null;
  const srcImage = film?.poster_path || film?.backdrop_path;

  if (film.type === "tv") {
    getSeasonByFilms = await getSeasonByFilm(Number(id));

    if (getSeasonByFilms[0]?.id) {
      getEpisodeBySeasons = await getEpisodeBySeason(
        Number(getSeasonByFilms[0].id)
      );
    }
  }
  return (
    <div className="film-detail">
      <div className="top-detail-wrap">
        <div className="relative w-full h-0 pb-[42%] overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover opacity-20"
            src={srcImage}
            alt={film.title}
          />
        </div>
      </div>
      <div
        className="
          flex-tf-col-mobile
          max-w-[1640px] 
          px-[1.25rem] 
          mt-[-200px] 
          ml-auto mr-auto 
          relative z-3 
          flex justify-between 
          items-stretch w-full"
      >
        <div
          className="
          rounded-tl-[1.25rem]
          rounded-tr-[3rem]
          rounded-br-[1.25rem]
          rounded-bl-[1.25rem]
          p-[2.5rem] 
          backdrop-filter-[blur(20px)] 
          bg-[var(--bg-des-film)]
          w-full lg:w-[27.5%]"
        >
          <div>
            <div className="max-w-[160px]">
              <div className=" relative w-full h-0 pb-[150%] overflow-hidden rounded-xl">
                <img
                  src={srcImage}
                  alt={film.title}
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
            </div>

            <h2 className="mt-4 mb-2 text-[var(--text-white)]">{film.title}</h2>
            <Genres genres={film.genres || []} />
            <div>
              <h3 className="mt-4 mb-2 text-[var(--text-white)]">
                Giới thiệu:
              </h3>
              <span>{film.overview}</span>
            </div>
            <div className="flex items-center mt-4 mb-2 gap-2">
              <h3 className=" text-[var(--text-white)]">Thời lượng:</h3>
              <span>{film.runtime || 0}m</span>
            </div>
            <div className="flex items-center mt-4 mb-2 gap-2">
              <h3 className="text-[var(--text-white)]">Đạo diễn:</h3>
              <span>
                {Array.isArray(film?.directors) && film.directors.length > 0
                  ? film.directors
                      .map((director: any) => director.name)
                      .join(", ")
                  : ""}
              </span>
            </div>
            <div>
              <h3 className="mt-4 mb-4 text-[var(--text-white)]">Diễn viên:</h3>
              {Array.isArray(film?.cast) && film.cast.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                  {film.cast.map((cast: any) => (
                    <div
                      key={cast.id}
                      className="text-center flex flex-col items-center gap-[0.75rem]"
                    >
                      <div className="w-[80px]">
                        <div className="relative w-full h-0 pb-[100%] rounded-lg overflow-hidden">
                          <img
                            src={
                              cast.profile_path
                                ? `${process.env.TMDB_PUBLIC_API_ENDPOINT}${cast.profile_path}`
                                : undefined
                            }
                            alt={cast.name}
                            className="absolute w-full h-full object-cover inset-0 rounded-[50%]"
                          />
                        </div>
                      </div>

                      <p className="text-sm text-white line-clamp-1">
                        {cast.name}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div
          className="
          rounded-tl-[3rem]
          rounded-tr-[1.25rem]
          rounded-br-[1.25rem]
          rounded-bl-[1.25rem]
          backdrop-filter-[blur(20px)] 
          bg-[var(--bg-des-film)]
          w-full lg:w-[72.5%]
          flex flex-col"
        >
          <div className="p-[1.875rem]">
            <Link
              href={
                film?.type === "movie"
                  ? `/video/movie/${film.id}`
                  : getSeasonByFilms?.[0]?.id && getEpisodeBySeasons?.[0]?.id
                    ? `/video/tv/${getSeasonByFilms[0].id}/${getEpisodeBySeasons[0].id}`
                    : "#"
              }
              className="
              px-[2rem] py-[0.95rem] 
              bg-primary min-h-[3.75rem] 
              w-max flex 
              items-center 
              rounded-[2rem] 
              text-sm bg-[var(--primary-color)] 
              text-[var(--text-black)] 
              hover:bg-[var(--primary-color-hover)]
              hover:shadow-[var(--box-shadow-film)]
              hover:opacity-90
              "
            >
              <PlayIcon className="w-5 h-5 min-w-4 min-h-4 mr-2" />
              <span className="text-[1.35rem] font-medium">Xem ngay</span>
            </Link>
          </div>
          {film.type === "tv" && getSeasonByFilms && (
            <div className="px-[2.5rem]">
              <FilmTv seasons={getSeasonByFilms} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Film;
