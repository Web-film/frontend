import NotFound from "@/components/features/notFound/NotFound";
import Video from "@/components/features/video/Video";
import { getDetailFilm } from "@/lib/service";

async function PageFilmVideo({ params }: { params: { movieId: string } }) {
  const { movieId } = await params;
  const movie = await getDetailFilm(Number(movieId));
  console.log({ movie });
  if (!movie || !movie?.id || movie.type === "tv") {
    return <NotFound />;
  }
  return (
    <div>
      <Video film_id={movieId} />
    </div>
  );
}

export default PageFilmVideo;
