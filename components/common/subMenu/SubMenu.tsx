import { Genre } from "@/lib/service";
import Link from "next/link";
type Props = {
  genres: Genre[];
};
export default function SubMenu({ genres }: Props) {
  return (
    <div className="absolute left-0 top-full mt-2 bg-[var(--bg-navbar)] rounded-md shadow-lg p-2 z-50 w-max">
      <div className="grid grid-cols-4 gap-1 text-sm">
        {genres.map((genre) => (
          <Link
            key={genre.id}
            href={`/`}
            className="flex items-center px-1.5 py-1 hover:text-[var(--primary-text)] hover:bg-[var(--bg-hover-navbar)] rounded-lg w-[140px]"
          >
            {genre.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
