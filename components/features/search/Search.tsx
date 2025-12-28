"use client";

import useDebounce from "@/components/hooks/useDebounce";
import { getFilm } from "@/lib/service";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useEffect, useRef, useState } from "react";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [listSearch, setListSearch] = useState<any[]>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const inputRef = useRef<HTMLInputElement>(null);

  const loading = searchTerm !== debouncedSearchTerm;

  useEffect(() => {
    if (!debouncedSearchTerm.trim()) {
      setListSearch([]);
      return;
    }

    (async () => {
      const data = await getFilm({
        page: 1,
        limit: 8,
        search: debouncedSearchTerm,
      });
      setListSearch(data);
    })();
  }, [debouncedSearchTerm]);

  const handleClear = () => {
    setSearchTerm("");
    setListSearch([]);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-md md:min-w-auto lg:min-w-125">
      <div className="text-white h-12 flex items-center gap-2 border rounded-md px-3 py-2 bg-[var(--bg-search)]">
        <MagnifyingGlassIcon className="h-6 w-6 text-gray-300" />

        <input
          ref={inputRef}
          type="text"
          placeholder="Tìm kiếm phim..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex w-full bg-transparent text-white placeholder:text-body focus:outline-none"
        />

        {searchTerm && !loading && (
          <button
            title="Xóa tìm kiếm"
            onClick={handleClear}
            className="text-gray-400 hover:text-white"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}

        {loading && (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-transparent" />
        )}
      </div>

      {listSearch.length > 0 && (
        <div
          className="absolute top-full mt-2 w-full rounded-md bg-[#1f1f1f] shadow-lg z-50
                  max-h-[400px] overflow-y-auto"
        >
          {listSearch.map((film) => {
            const imgSrc = film?.poster_path || film?.backdrop_path;
            return (
              <div
                key={film.id}
                className="flex items-center gap-3 px-3 py-2 hover:bg-[#2a2a2a] cursor-pointer"
              >
                <img
                  src={imgSrc}
                  alt={film.title}
                  className="w-10 h-14 object-cover rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/images/no-poster.png";
                  }}
                />
                <h4 className="text-sm text-white line-clamp-2">
                  {film.title}
                </h4>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Search;
