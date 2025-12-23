import SubMenu from "@/components/common/subMenu/SubMenu";
import { Genre, getGenres } from "@/lib/service";
import { useEffect, useState } from "react";

export default function SubMenuServer() {
  
  const [genres, setGenres] = useState<Genre[]>([]);
  
  useEffect(() => {
    async function fetchGenres() {
      const data = await getGenres();
      setGenres(data);
    }
    fetchGenres();
  }, []);

  // console.log(genres);
  return <SubMenu genres={genres} />;
}
