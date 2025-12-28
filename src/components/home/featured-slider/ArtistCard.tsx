import { MouseEvent } from "react";
import Link from "next/link";
import { UsersRound } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Artist {
  id: number;
  name: string;
  genre: string;
  imageUrl: string;
  followers: string;
}

interface ArtistCardProps {
  artist: Artist;
  onFollow: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function ArtistCard({ artist, onFollow }: ArtistCardProps) {
  return (
    <Link href={`/artists/${artist.id}`} className="block">
      <Card className="flex h-full flex-col items-center gap-3 p-4 text-center shadow-none transition-transform md:gap-4 md:p-6 lg:p-8">
        {/* 아바타 */}
        <Avatar className="ring-border size-20 ring-4 md:size-24 lg:size-30">
          <AvatarImage src={artist.imageUrl} alt={artist.name} />
          <AvatarFallback>{artist.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>

        {/* 아티스트 정보 */}
        <div className="space-y-0.5">
          <h3 className="text-text-main text-base font-bold md:text-lg">{artist.name}</h3>
          <p className="text-text-sub text-xs font-semibold md:text-sm">{artist.genre}</p>
        </div>

        {/* 팔로워 수 */}
        <div className="text-text-sub flex items-center gap-1.5 text-xs font-semibold md:text-sm">
          <UsersRound className="size-3 md:size-3.5" strokeWidth={3} />
          <span>{artist.followers} 팔로우 중</span>
        </div>

        {/* 팔로우 버튼 */}
        <Button variant="default" className="w-full text-sm md:text-base" onClick={onFollow}>
          팔로우
        </Button>
      </Card>
    </Link>
  );
}
