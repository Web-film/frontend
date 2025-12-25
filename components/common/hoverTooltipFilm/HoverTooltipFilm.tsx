"use client";
import Link from "next/link";

export default function HoverTooltipFilm({ film, x, y, onLeave }: any) {
  return (
    <div
      className="absolute z-[9999]"
       style={{
        left: x,
        top: y,
        // transform: "translate(-50%, -100%)",
      }}
    >
      <div
        className="
          w-[360px]
          rounded-xl
          bg-[#111]
          shadow-2xl
          overflow-hidden
          animate-hover-card
        "
      >
        <div
          className="h-[200px] bg-cover bg-center"
          style={{ backgroundImage: `url(${film.poster_path})` }}
        />

        <div className="p-4 space-y-2">
          <h3 className="text-white font-semibold line-clamp-1">
            {film.title}
          </h3>

          <p className="text-sm text-gray-400 line-clamp-3">{film.overview}</p>

          <div className="flex gap-2 pt-2">
            <Link
              href={`/xem-phim/${film.slug}`}
              className="px-3 py-2 bg-primary rounded-md text-sm"
            >
              ▶ Xem ngay
            </Link>
            <Link
              href={`/phim/${film.slug}`}
              className="px-3 py-2 border border-gray-600 rounded-md text-sm"
            >
              Chi tiết
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
