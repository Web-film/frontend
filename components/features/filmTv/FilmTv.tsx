"use client";

import { useEffect, useState, useRef } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { seasonType } from "@/lib/service";

function FilmTv({ seasons }: { seasons: seasonType[] }) {
  const [seasonData, setSeasonData] = useState<seasonType | null>(null);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // set mùa mặc định
  useEffect(() => {
    if (seasons?.length > 0) {
      setSeasonData(seasons[0]);
    }
  }, [seasons]);

  // click outside → đóng dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {seasonData && (
        <div
          className="flex items-center gap-2 text-white cursor-pointer main-season select-none"
          onClick={() => setOpen(!open)}
        >
          <AdjustmentsHorizontalIcon className="w-6 h-6" />
          <span className="text-xl">{seasonData.name}</span>
          <ChevronDownIcon
            className={`w-7 h-7 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </div>
      )}

      {/* DROPDOWN */}
      {open && (
        <div className="absolute left-0 mt-3 w-[260px] bg-[var(--text-white)] rounded-xl shadow-xl z-50 overflow-hidden">
          <div
              className={`px-4 py-3 text-black hover:opacity-90 cursor-pointer transition`}
            >
              Danh sách phần
            </div>
          {seasons.map((season) => (
            <div
              key={season.id}
              className={`px-4 py-3 font-semibold text-black hover:opacity-90 cursor-pointer transition
                ${season.id === seasonData?.id ? "bg-[var(--primary-color)]" : ""}`}
              onClick={() => {
                setSeasonData(season);
                setOpen(false);
              }}
            >
              {season.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilmTv;
