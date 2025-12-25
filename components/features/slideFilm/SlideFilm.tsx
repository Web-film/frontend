"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FilmType } from "@/lib/service";
import FilmItem from "@/components/common/filmItem/FilmItem";
import { Navigation } from "swiper/modules";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

export default function SlideFilm({
  classNameSlide,
  films,
}: {
  classNameSlide?: string;
  films: FilmType[];
}) {
  return (
    <div className="relative w-[calc(100%-200px)] flex items-center">
      <Swiper
        modules={[Navigation]}
        slidesPerView={5}
        spaceBetween={16}
        navigation={{
          nextEl: `.slide-next-${classNameSlide}`,
          prevEl: `.slide-prev-${classNameSlide}`,
        }}
        className={`slide-film ${classNameSlide}`}
      >
        {films.map((film: FilmType) => (
          <SwiperSlide key={film.id}>
            <FilmItem film={film} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={`slide-prev-${classNameSlide} absolute -translate-x-1/2 z-1 left-0 top-[calc(50%-28px)] cursor-pointer w-[40px] h-[40px] min-w-[40px] flex justify-center items-center bg-[var(--background)] rounded-full`}>
        <ChevronLeftIcon className="w-[20px] h-[20px] min-w-[20px] min-h-[20px] text-[var(--text-black)]" />
      </div>
      <div className={`slide-next-${classNameSlide} absolute translate-x-1/2 z-1 right-0 top-[calc(50%-28px)] cursor-pointer w-[40px] h-[40px] min-w-[40px] flex justify-center items-center bg-[var(--background)] rounded-full`}>
        <ChevronRightIcon className="w-[20px] h-[20px] min-w-[20px] min-h-[20px] text-[var(--text-black)]" />
      </div>
    </div>
  );
}
