import { ArtistListContent } from "@/types/artists";
import React from "react";
import ArtistListCard from "@/components/artist/list/ArtistListCard";

export default function ArtistListItems({ artists }: { artists: ArtistListContent[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-8 lg:gap-y-10">
      {artists.map((artist) => (
        <ArtistListCard key={artist.id} artist={artist} />
      ))}
    </div>
  );
}
