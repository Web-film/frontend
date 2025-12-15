import Header from "@/app/Header";

export default function Home() {
  return (
    <main>
      <Header />
      <img
        className="h-48 w-96 object-cover size-48 shadow-xl rounded-md"
        alt="Ảnh test"
        src="https://i.pinimg.com/236x/49/d4/57/49d45711486bd4119192521fb703bcb3.jpg"
      />
    </main>
  );
}
