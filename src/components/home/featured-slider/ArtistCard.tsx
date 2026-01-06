"use client";

import Link from "next/link";
import { UsersRound } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArtistListContent } from "@/types/artists";
import { toast } from "sonner";
import { MouseEvent, useState } from "react";
import { deleteLikeArtist, postLikeArtist } from "@/lib/api/artists/artists.client";

export default function ArtistCard({
  artist,
  isAuthenticated,
}: {
  artist: ArtistListContent;
  isAuthenticated: boolean;
}) {
  const [currentFollows, setCurrentFollows] = useState<number>(artist.likeCount);
  const [currentLiked, setCurrentLiked] = useState<boolean>(artist.isLiked ?? false);

  const handleFollow = async (e: MouseEvent<HTMLButtonElement>, artistId: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("로그인 후 이용해주세요.");
      return;
    }

    // TODO : 낙관적 업데이트 고도화 적용
    if (currentLiked) {
      await deleteLikeArtist(artistId);
      setCurrentFollows((prev) => prev - 1);
      toast.success("해당 아티스트를 찜 해제했습니다.");
    } else {
      await postLikeArtist(artistId);
      setCurrentFollows((prev) => prev + 1);
      toast.success("해당 아티스트를 찜했습니다.");
    }
    setCurrentLiked(!currentLiked);
  };

  return (
    <Link href={`/artists/${artist.id}`} className="block">
      <Card className="flex h-full flex-col items-center gap-3 p-4 text-center shadow-none transition-transform hover:opacity-90 md:gap-4 md:p-6 lg:p-8">
        {/* 아바타 */}
        <Avatar className="ring-border size-20 ring-4 md:size-24 lg:size-30">
          <AvatarImage src={artist.imageUrl} alt={artist.nameKo ?? artist.artistName} />
          <AvatarFallback>{artist.nameKo ?? artist.artistName}</AvatarFallback>
        </Avatar>

        {/* 아티스트 정보 */}
        <h3 className="text-text-main text-base font-bold md:text-lg">
          {artist.nameKo ?? artist.artistName}
        </h3>

        {/* 팔로워 수 */}
        <div className="text-text-sub flex items-center gap-1.5 text-xs font-semibold md:text-sm">
          <UsersRound className="size-3 md:size-3.5" strokeWidth={3} />
          <span>{currentFollows} 팔로우 중</span>
        </div>

        {/* 팔로우 버튼 */}
        <Button
          variant={currentLiked ? "outline" : "default"}
          className="w-full text-sm md:text-base"
          onClick={(e) => handleFollow(e, artist.id)}
        >
          {currentLiked ? "팔로잉" : "팔로우"}
        </Button>
      </Card>
    </Link>
  );
}
