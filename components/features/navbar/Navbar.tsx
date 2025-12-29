"use client";

import SubMenuServer from "@/components/common/subMenu/SubMenuServer";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
    <nav className="flex flex-tf-col-mobile items-center space-x-6 text-white text-sm">
      <Link href="/" className="min-w-max hover:text-[var(--primary-text)]">
        Trang chủ
      </Link>
      <Link href="/type/movie" className="min-w-max hover:text-[var(--primary-text)]">
        Phim Lẻ
      </Link>
      <Link href="/type/tv" className="min-w-max hover:text-[var(--primary-text)]">
        Phim Bộ
      </Link>
      <div ref={ref} className="min-w-max relative">
        <button
          onClick={() => setOpen(!open)}
          className="hover:text-[var(--primary-text)] cursor-pointer flex items-center"
        >
          Thể Loại
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
        </button>

        {open && <SubMenuServer />}
      </div>
    </nav>
  );
}

export default Navbar;
