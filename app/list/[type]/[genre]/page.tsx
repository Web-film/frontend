import { redirect } from "next/navigation";

export default async function GenreIndexRedirect({ params }: { params: { type: string; genre: string } }) {
  const { type, genre } = await params;
  return redirect(`/list/${type}/${genre}/1`);
}
