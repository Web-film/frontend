"use client";

import SubMenuServer from "@/components/common/subMenu/SubMenuServer";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, []);

  return (
    <nav className="flex flex-tf-col-mobile items-center space-x-6 text-white text-sm">
      <Link href="/" className="min-w-max hover:text-[var(--primary-text)]">
        Trang chủ
      </Link>

      <Link
        href="/type/movie"
        className="min-w-max hover:text-[var(--primary-text)]"
      >
        Phim Lẻ
      </Link>

      <Link
        href="/type/tv"
        className="min-w-max hover:text-[var(--primary-text)]"
      >
        Phim Bộ
      </Link>

      <div ref={wrapperRef} className="min-w-max relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="hover:text-[var(--primary-text)] cursor-pointer flex items-center"
        >
          Thể Loại
          <ChevronDownIcon className="-mr-1 size-5 text-gray-400" />
        </button>

        {open && (
          <div onClick={() => setOpen(false)}>
            <SubMenuServer />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
