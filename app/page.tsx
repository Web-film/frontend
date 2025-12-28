import ListFilm from "@/components/features/listFilm/ListFilm";
import SlideBanner from "@/components/features/slideBanner/SlideBanner";
import { getBanners, getFilm, getNew, getPopular } from "@/lib/service";

export default async function Home() {
  const banners = await getBanners(6, 1);
  const popularFilms = await getPopular(10, 1);
  const newFilms = await getNew(24, 1);
  const filmMove = await getFilm({
    limit: 24,
    page: 1,
    type: "movie",
  });
  const filmTv = await getFilm({
    limit: 24,
    page: 1,
    type: "tv",
  });

  return (
    <main>
      <div className="container flex flex-col gap-[50px]">
        <SlideBanner banners={banners} />
        <div className="rounded-2xl bg-[image:var(--bg-list)] flex flex-col p-[2rem] gap-[2rem]">
          <ListFilm
            classNameSlide={"slide-populate"}
            films={popularFilms}
            title="Top 10 bộ phim thịnh hành"
          />
          <ListFilm
            classNameSlide={"slide-new"}
            films={newFilms}
            title="Phim mới cập nhật"
          />
          <ListFilm
            classNameSlide={"slide-movie"}
            films={filmMove}
            title="Phim lẻ mới nhất"
          />
          <ListFilm
            classNameSlide={"slide-tv"}
            films={filmTv}
            title="Phim bộ mới nhất"
          />
        </div>
      </div>
    </main>
  );
}
