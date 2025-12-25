import { ChevronRightIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

function TitleListFilm({
  title,
  href,
  bgText,
}: {
  title: string;
  href: string;
  bgText?: string;
}) {
  return (
    <div className="title-list-film w-[200px]">
      <h2
        style={{
          background: bgText ? bgText : "var(--bg-text-title)",
          WebkitTextFillColor: "transparent",
          WebkitBackgroundClip: "text !important",
        }}
      >
        {title}
      </h2>
      <Link href={href} className="see-mor text-[var(--text-white)] flex items-center gap-2 hover:text-[var(--primary-text)]">
        <span className="">Xem toàn bộ</span>
        <ChevronRightIcon className="w-5 h-5" />
      </Link>
    </div>
  );
}

export default TitleListFilm;
