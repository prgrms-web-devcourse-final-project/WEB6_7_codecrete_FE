import { Item, ItemTitle } from "@/components/ui/item";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { RelatedArtist } from "@/types/artists";
import Image from "next/image";

export default function SimilarArtists({ relatedArtists }: { relatedArtists: RelatedArtist[] }) {
  return (
    <div className={"flex flex-col gap-6"}>
      <h3 className={"text-xl font-bold"}>유사 아티스트</h3>
      {relatedArtists.map((artist) => (
        <Item key={artist.artistName} variant={"outline"} asChild>
          {/*TODO: 아래 링크 href에 해당 관련 아티스트 id로 이동하게 수정*/}
          <Link href={`/artists/`}>
            <div className={"bg-text-point-sub relative h-16 w-16 overflow-hidden rounded-full"}>
              {artist.imageUrl ? (
                <Image
                  fill
                  src={artist.imageUrl}
                  alt={artist.artistName}
                  className="object-cover"
                  sizes="64px"
                />
              ) : (
                <div className="h-full w-full rounded-full bg-gray-200" />
              )}
            </div>
            <div className={"flex flex-1 flex-col gap-1"}>
              <ItemTitle>{artist.artistName}</ItemTitle>
            </div>
            <div>
              <ChevronRight className={"text-text-sub opacity-60"} />
            </div>
          </Link>
        </Item>
      ))}
    </div>
  );
}
