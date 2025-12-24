import { ArtistListItem } from "@/types/artists";
import React from "react";
import ArtistListCard from "@/components/artist/list/ArtistListCard";

export default function ArtistListItems({ artists }: { artists: ArtistListItem[] }) {
  return (
    <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {artists.map((artist) => (
        <ArtistListCard key={artist.id} artist={artist} />
      ))}
    </div>
  );
}
