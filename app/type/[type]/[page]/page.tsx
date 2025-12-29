import { FilmType, getFilm } from "@/lib/service";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlayIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";

interface Props {
  params: { type: string; page: string };
}
async function ListTypeGenre({ params }: Props) {
  const { type, page } = await params;
  const currentPage = parseInt(page || "1");
  const limit = 35;

  const getDatas = await getFilm({ limit, page: currentPage, type: type });
  const list = getDatas.items;
  const pagination = getDatas.pagination;
  const totalPages = Math.ceil((pagination?.total || 0) / limit);

  return (
    <div className="container">
      <h1 className="pt-30 pb-8">
        Thể loại: {type === "movie" ? "Phim lẻ" : "Phim bộ"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-3">
        {list.map((film: FilmType) => {
          const imageSrc = film.poster_path || film.backdrop_path || undefined;
          return (
            <div key={film.id} className="">
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
        })}
      </div>

      <div className="py-6 flex gap-4 items-center w-full justify-center">
        {currentPage > 1 && (
          <Link href={`/type/${type}/${currentPage - 1}`}>
            <ArrowLeftIcon className="w-4 h-4" />
          </Link>
        )}

        <span style={{ margin: "0 10px" }}>
          Page {currentPage} / {totalPages}
        </span>

        {currentPage < totalPages && pagination?.hasNextPage && (
          <Link href={`/type/${type}/${currentPage + 1}`}>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default ListTypeGenre;
