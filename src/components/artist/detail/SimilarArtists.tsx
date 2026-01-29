import { Item, ItemTitle } from "@/components/ui/item";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { RelatedArtist } from "@/types/artists";
import Image from "next/image";

export default function SimilarArtists({ relatedArtists }: { relatedArtists: RelatedArtist[] }) {
  return (
    <div className="space-y-4 lg:space-y-6">
      <h3 className={"text-base font-bold lg:text-xl"}>유사 아티스트</h3>
      {relatedArtists.map((artist) => (
        <Item key={artist.spotifyArtistId} variant={"outline"} asChild>
          <Link href={`/artists/${artist.id}`}>
            <div className={"bg-text-point-sub relative h-16 w-16 overflow-hidden rounded-full"}>
              {artist.imageUrl ? (
                <Image
                  fill
                  src={artist.imageUrl}
                  alt={artist.nameKo ?? artist.artistName}
                  className="object-cover"
                  sizes="64px"
                />
              ) : (
                <div className="h-full w-full rounded-full bg-gray-200" />
              )}
            </div>
            <div className={"flex flex-1 flex-col gap-1"}>
              <ItemTitle>{artist.nameKo ?? artist.artistName}</ItemTitle>
            </div>
            <ChevronRight className="stroke-text-sub size-4" />
          </Link>
        </Item>
      ))}
    </div>
  );
}
