import NotFound from "@/components/features/notFound/NotFound";
import Video from "@/components/features/video/Video";
import { checkEpisode } from "@/lib/service";

async function PageVideo({ params }: { params: { seasonId: string; id: string } }) {
  const { seasonId, id } = await params;
  const episode  = await checkEpisode(Number(seasonId), Number(id));

  if (!episode) {
   return <NotFound />;
  }
  return (
    <div>
      <Video seasonId={seasonId} id={id} />
    </div>
  );
}

export default PageVideo;
