"use client";

import { useState, useRef, useEffect } from "react";
import YouTube, { YouTubePlayer } from "react-youtube";
import {
  BackwardIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/16/solid";
import {
  episodeType,
  FilmType,
  getDetailFilm,
  getEpisodeBySeason,
  getSeasonByFilm,
  getSeasonById,
  increaseViewMovie,
  increaseViewTv,
  seasonType,
} from "@/lib/service";
import Genres from "@/components/common/genres/Genres";
import FilmTv from "@/components/features/filmTv/FilmTv";

const episodeFetchs = [
  { id: 1, title: "Tập 1", youtubeId: "dQw4w9WgXcQ" },
  { id: 2, title: "Tập 2", youtubeId: "9bZkp7q19f0" },
  { id: 3, title: "Tập 3", youtubeId: "3tmd-ClpJxA" },
];

export default function Video({
  seasonId,
  id,
  film_id,
}: {
  seasonId?: string;
  id?: string;
  film_id?: string;
}) {
  const [episodes, setEpisodes] = useState<episodeType[]>([]);
  const [seasonList, setSeasonList] = useState<seasonType[]>([]);
  const [filmData, setFilmData] = useState<FilmType>();
  const [currentEp, setCurrentEp] = useState(0);

  const playerRef = useRef<YouTubePlayer | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [watchedTime, setWatchedTime] = useState(0);

  const barRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const viewedRef = useRef(false);

  const onReady = (e: { target: YouTubePlayer }) => {
    playerRef.current = e.target;
    setDuration(e.target.getDuration());

    intervalRef.current && clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const time = e.target.getCurrentTime();
      setCurrentTime(time);
      setWatchedTime((prev) => Math.max(prev, time));
    }, 300);
  };

  const resetPlayer = () => {
    setCurrentTime(0);
    setWatchedTime(0);
    intervalRef.current && clearInterval(intervalRef.current);
  };

  const nextEpisode = () => {
    if (currentEp < episodes.length - 1) {
      playerRef.current?.pauseVideo();
      setIsPlaying(false);
      resetPlayer();
      setCurrentEp((p) => p + 1);
    }
  };

  const prevEpisode = () => {
    if (currentEp > 0) {
      playerRef.current?.pauseVideo();
      setIsPlaying(false);
      resetPlayer();
      setCurrentEp((p) => p - 1);
    }
  };

  const onEnd = () => nextEpisode();

  const updateByClientX = (x: number) => {
    if (!barRef.current || !playerRef.current || !duration) return;

    const rect = barRef.current.getBoundingClientRect();
    const percent = Math.min(Math.max((x - rect.left) / rect.width, 0), 1);
    const time = percent * duration;

    playerRef.current.seekTo(time, true);
    setCurrentTime(time);
  };

  useEffect(() => {
    if (!seasonId) return;

    (async () => {
      const data = await getEpisodeBySeason(Number(seasonId));
      setEpisodes(data || []);
    })();

    (async () => {
      const data = await getSeasonById(Number(seasonId));
      if (data?.film) {
        setFilmData(data.film);
      }

      if (data?.film?.type === "tv") {
        const getSeasonByFilms = await getSeasonByFilm(Number(data?.film.id));
        setSeasonList(getSeasonByFilms);
      }
    })();
  }, [seasonId]);

  useEffect(() => {
    console.log({ film_id });
    if (!film_id) return;

    (async () => {
      const data = await getDetailFilm(Number(film_id));
      setFilmData(data || {});
    })();
  }, [film_id]);

  useEffect(() => {
    if (!dragging) return;

    const move = (e: MouseEvent) => updateByClientX(e.clientX);
    const up = () => setDragging(false);

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
  }, [dragging]);

  useEffect(() => {
    if (!duration || viewedRef.current) return;

    const increase = async () => {
      try {
        const percent = watchedTime / duration;

        if (percent >= 0.3) {
          viewedRef.current = true;

          if (filmData?.type === "movie") {
            await increaseViewMovie(Number(filmData.id));
          } else if (filmData?.type === "tv") {
            await increaseViewTv(Number(id));
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    increase();
  }, [watchedTime, duration, filmData?.type, filmData?.id, id]);

  const currentPercent = duration ? (currentTime / duration) * 100 : 0;
  const watchedPercent = duration ? (watchedTime / duration) * 100 : 0;

  const fallbackYoutubeId =
    episodeFetchs[(episodes[currentEp]?.id ?? 1) % episodeFetchs.length]
      ?.youtubeId;

  return (
    <div className="max-content">
      <div className="pt-30 flex flex-col gap-2">
        <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
          <YouTube
            key={episodes[currentEp]?.video_key || fallbackYoutubeId}
            videoId={episodes[currentEp]?.video_key || fallbackYoutubeId}
            onReady={onReady}
            onEnd={onEnd}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            opts={{
              width: "100%",
              height: "100%",
              playerVars: { controls: 0 },
            }}
            className="absolute inset-0"
          />
        </div>

        <div
          ref={barRef}
          className="relative h-2 bg-gray-700 rounded cursor-pointer"
          onMouseDown={(e) => {
            setDragging(true);
            updateByClientX(e.clientX);
          }}
        >
          <div
            className="absolute h-2 bg-red-500/50"
            style={{ width: `${watchedPercent}%` }}
          />
          <div
            className="absolute h-2 bg-red-600"
            style={{ width: `${currentPercent}%` }}
          />
          <div
            className="absolute top-1/2 w-4 h-4 bg-red-600 rounded-full -translate-y-1/2"
            style={{ left: `calc(${currentPercent}% - 8px)` }}
          />
        </div>

        <div className="flex gap-3 mt-4 justify-between">
          <button
            onClick={() =>
              isPlaying
                ? playerRef.current?.pauseVideo()
                : playerRef.current?.playVideo()
            }
            title={isPlaying ? "Tạm dừng" : "Phát"}
          >
            {isPlaying ? (
              <PauseIcon className="w-8 h-8 text-[var(--primary-color)] cursor-pointer" />
            ) : (
              <PlayIcon className="w-8 h-8 text-[var(--primary-color)] cursor-pointer" />
            )}
          </button>
          {filmData?.type === "tv" && (
            <div className="flex gap-3">
              <button
                onClick={prevEpisode}
                disabled={currentEp === 0}
                title="Tập trước"
              >
                <BackwardIcon
                  className={`w-6 h-6 ${currentEp !== 0 ? "text-[var(--primary-color)]" : ""} cursor-pointer`}
                />
              </button>

              <button
                onClick={nextEpisode}
                disabled={currentEp === episodes.length - 1}
                title="Tập sau"
              >
                <ForwardIcon
                  className={`w-6 h-6 ${currentEp !== episodes.length - 1 ? "text-[var(--primary-color)]" : ""} cursor-pointer`}
                />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col g-10 p-10">
        <div className="info flex flex-tf-col-mobile gap-6">
          <div className="w-full max-w-full md:w-25 md:max-w-25">
            <div className="w-full h-0 pb-[100%] md:pb-[190%] block relative">
              <img
                src={filmData?.poster_path || filmData?.backdrop_path || ""}
                alt={filmData?.title}
                className="absolute w-full h-full object-cover inset-0 rounded-[0.4rem]"
              />
            </div>
          </div>
          <div className="md:w-110 md:max-w-110 w-full max-w-full">
            <h2 className="text-[var(--text-white)] mb-4">
              {filmData?.title || ""}
            </h2>
            {filmData?.genres && <Genres genres={filmData.genres} />}
          </div>
          <div className="flex-4">
            <span>{filmData?.overview || ""}</span>
          </div>
        </div>
        {filmData?.type === "tv" && (
          <div className="pt-[2.5rem]">
            <FilmTv
              seasons={seasonList}
              currentId={Number(seasonId)}
              id={Number(id)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* utils */
function formatTime(t: number) {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
