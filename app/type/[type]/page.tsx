import { redirect } from "next/navigation";

export default async function GenreIndexRedirect({ params }: { params: { type: string } }) {
  const { type } = await params;
  return redirect(`/type/${type}/1`);
}
