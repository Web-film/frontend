"use client";

import useDebounce from "@/components/hooks/useDebounce";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const loading = searchTerm !== debouncedSearchTerm;

  return (
    <div className="text-white h-12 relative flex items-center gap-3 border border-transparent rounded-md line-hight-2 px-3 py-2 bg-[var(--bg-search)] w-full max-w-md">
      <div className="inset-y-0 start-0 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-6 w-6" />
      </div>
      <input
        type="text"
        placeholder="Tìm kiếm phim..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex w-full bg-transparent text-white placeholder:text-body focus:outline-none"
      />

      {loading && (
        <div className="min-h-4 h-4 min-w-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-transparent text-white" />
      )}
    </div>
  );
}

export default Search;
