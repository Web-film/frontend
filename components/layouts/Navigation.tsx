"use client";

import Navbar from "@/components/features/navbar/Navbar";
import Search from "@/components/features/search/Search";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function Navigation() {
  const [openMobile, setOpenMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpenMobile(false);
  }, [pathname]);
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`relative transition-all duration-300 ${
        isScrolled ? "header-scroll" : ""
      }`}
    >
      <div className="container">
        <div className="h-12 lg:h-22.5 flex items-center justify-between gap-4 px-4">
          <div className="hidden lg:flex items-center gap-12">
            <Search />
            <Navbar />
          </div>

          <button
            onClick={() => setOpenMobile(true)}
            className="lg:hidden text-white"
          >
            <Bars3Icon className="w-8 h-8" />
          </button>
        </div>
      </div>

      {openMobile && (
        <div className="fixed inset-0 z-50 bg-black/60">
          <div className="absolute top-0 left-0 w-72 h-full bg-[#121212] p-4">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setOpenMobile(false)}
                className="text-white"
              >
                <XMarkIcon className="w-7 h-7" />
              </button>
            </div>

            <div className="space-y-6">
              <Search />
              <Navbar />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navigation;
