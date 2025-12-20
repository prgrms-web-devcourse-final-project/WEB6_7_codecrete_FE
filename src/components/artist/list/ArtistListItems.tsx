import Link from "next/link";
import { ArtistListItem } from "@/types/artists";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

{
  /*TODO: 나중에 바로 아래 div에서 api로 불러온 콘서트 목록 map으로 돌리기*/
}

export default function ArtistListItems({ artists }: { artists: ArtistListItem[] }) {
  return (
    <div className="grid grid-cols-5 gap-x-8 gap-y-12">
      {artists.map((artist) => (
        <Link
          key={artist.id}
          href={`/concerts/${artist.id}`}
          className="flex cursor-pointer flex-col gap-5"
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
            <Image
              src={artist.imageUrl || "/images/artist-placeholder.png"}
              alt="Concert Poster"
              fill
              sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
              className="object-cover"
            />
            <Button
              type="button"
              aria-label="아티스트 좋아요"
              className="absolute top-2 right-2 z-10 h-10 w-10 cursor-pointer rounded-full bg-black/50 opacity-80 backdrop-blur-sm"
            >
              <Heart />
            </Button>
          </div>
          <strong className="line-clamp-1 text-2xl">{artist.artistName}</strong>
        </Link>
      ))}
    </div>
  );
}
