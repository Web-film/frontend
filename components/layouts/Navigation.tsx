import Navbar from "@/components/features/navbar/Navbar";
import Search from "@/components/features/search/Search";
import React from "react";

function Navigation() {
  return (
    <header>
      <div className="h-22.5 flex items-center gap-12">
        <Search />
        <Navbar />
      </div>
    </header>
  );
}

export default Navigation;
