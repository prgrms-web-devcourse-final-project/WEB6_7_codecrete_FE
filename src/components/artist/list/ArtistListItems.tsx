import { ArtistListContent } from "@/types/artists";
import React from "react";
import ArtistListCard from "@/components/artist/list/ArtistListCard";

export default function ArtistListItems({ artists }: { artists: ArtistListContent[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8 xl:gap-y-10">
      {artists.map((artist) => (
        <ArtistListCard key={artist.id} artist={artist} />
      ))}
    </div>
  );
}
