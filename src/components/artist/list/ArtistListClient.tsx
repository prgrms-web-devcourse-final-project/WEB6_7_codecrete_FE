"use client";

import { useState } from "react";
import ArtistListFilters from "@/components/artist/list/ArtistListFilters";
import ArtistListItems from "@/components/artist/list/ArtistListItems";
import { getArtists } from "@/lib/artists/artists.client";
import { ArtistListContent } from "@/types/artists";
import { useRouter } from "next/navigation";

export default function ArtistListClient({
  initialArtists,
  initialSort,
}: {
  initialArtists: ArtistListContent[];
  initialSort: string;
}) {
  const router = useRouter();

  const [artists, setArtists] = useState(initialArtists);
  const [sort, setSort] = useState(initialSort);

  const handleSortChange = async (value: string) => {
    setSort(value);
    router.replace(`?sort=${value}`);
    const nextArtists = await getArtists(0, 20, value);
    setArtists(nextArtists);
  };

  return (
    <>
      <ArtistListFilters onSortChange={handleSortChange} currentSort={sort} />
      <ArtistListItems artists={artists} />
    </>
  );
}
