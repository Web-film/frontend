"use client";

import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { FilmType } from "@/lib/service";
import BannerItem from "@/components/common/bannerItem/BannerItem";
import { useState } from "react";
import BannerPagination from "@/components/common/bannerPagination/BannerPagination";

function SlideBanner({ banners }: { banners: FilmType[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  return (
    <div
      id="default-carousel"
      className="relative w-full h-[860px]"
      data-carousel="slide"
    >
      <Swiper
        className="baner-swiper h-full"
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {banners?.map((banner) => (
          <SwiperSlide key={banner.id}>
            <BannerItem film={banner} />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div className="absolute right-0"> */}
      <div className="dis-non-mobile">
        <Swiper
          className="baner-swiper-thumbs w-[450px] h-[45px] right-[calc(-50%+450px)] bottom-[212px] absolute"
          freeMode={true}
          slidesPerView={6}
          spaceBetween={10}
          watchSlidesProgress={true}
          onSwiper={(swiper) => setThumbsSwiper(swiper)}
          modules={[FreeMode, Navigation, Thumbs]}
        >
          {banners?.map((banner) => (
            <SwiperSlide key={banner.id} className="rounded-[0.5rem]">
              <BannerPagination film={banner} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* </div> */}
    </div>
  );
}

export default SlideBanner;
