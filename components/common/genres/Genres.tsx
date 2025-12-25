import { GenreIncludes } from "@/lib/service";
import Link from "next/link";

function Genres({ genres }: { genres: GenreIncludes[] }) {
  return (
    <div className="genres flex gap-2 mb-[1.5rem]">
      {genres.map((g) => (
        <Link key={g.genre.id} href="/">
          <span
            key={g.genre.id}
            className="rounded-sm genre h-[26px] px-[0.4rem] inline-flex bg-[var(--bg-text)] hover:text-[var(--primary-text)] text-xs items-center"
          >
            {g.genre.name}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default Genres;
