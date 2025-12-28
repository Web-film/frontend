"use client";

import { useEffect, useState, useRef } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, PlayIcon } from "@heroicons/react/16/solid";
import { episodeType, getEpisodeBySeason, seasonType } from "@/lib/service";
import Link from "next/link";

function FilmTv({
  seasons,
  currentId,
  id,
}: {
  seasons: seasonType[];
  currentId?: number;
  id?: number;
}) {
  const [seasonData, setSeasonData] = useState<seasonType | null>(null);
  const [episodes, setEpisodes] = useState<episodeType[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!seasons || seasons.length === 0) return;

    if (currentId) {
      const currentSeason = seasons.find((s) => s.id === currentId);
      setSeasonData(currentSeason || seasons[0]);
    } else {
      setSeasonData(seasons[0]);
    }
  }, [seasons, currentId]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!seasonData?.id) return;

    const fetchEpisodes = async () => {
      const data = await getEpisodeBySeason(seasonData.id);
      setEpisodes(data || []);
    };

    fetchEpisodes();
  }, [seasonData]);

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
              className={`px-4 py-3 font-semibold text-black cursor-pointer transition
                ${season.id === seasonData?.id ? "bg-[var(--primary-color)] hover:opacity-90" : "hover:bg-[var(--text-base)]"}`}
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-8 gap-3 pt-8">
        {episodes.map((ep) => (
          <Link
            key={ep.id}
            href={`/video/tv/${seasonData?.id}/${ep.id}`}
            className={`px-4 py-3 rounded-lg bg-[#1a1a1a] text-white hover:bg-primary transition flex items-center justify-center
            ${id===ep.id ? "bg-[var(--primary-color)] text-[var(--text-black)]" : ""}`
            }
          >
            <PlayIcon className={`w-4 h-4 min-w-4 min-h-4 mr-2 ${id===ep.id ? "text-[var(--text-black)]" : ""}`} />
            <div className={`font-semibold ${id===ep.id ? "text-[var(--text-black)]" : ""}`}>Tập {ep.episode_number}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FilmTv;
