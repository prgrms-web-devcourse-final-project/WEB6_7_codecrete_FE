"use client";

import { Separator } from "@/components/ui/separator";
import { ArtistDetail } from "@/types/artists";
import Image from "next/image";
import FollowButton from "@/components/artist/detail/FollowButton";
import { useState } from "react";
import { toggleArtistLike } from "@/lib/api/artists/artists.server";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function ArtistDetailProfile({
  artist,
  artistId,
  initialIsLiked,
  upComingConcertCount,
}: {
  artist: ArtistDetail;
  artistId: number;
  initialIsLiked: boolean;
  upComingConcertCount: number;
}) {
  const [likeCount, setLikeCount] = useState(artist.likeCount);
  const [isLiked, setIsLiked] = useState<boolean>(initialIsLiked);
  const [isLoading, setIsLoading] = useState(false);

  const handleLikeClick = async () => {
    if (isLoading) return;

    const previousIsLiked = isLiked;
    const nextIsLiked = !isLiked;

    setIsLiked(nextIsLiked);
    setLikeCount((count) => count + (nextIsLiked ? 1 : -1));
    setIsLoading(true);

    try {
      await toggleArtistLike(artistId, previousIsLiked);
      toast.success(nextIsLiked ? "아티스트를 팔로우했습니다!" : "언팔로우했습니다.");
    } catch (err) {
      setIsLiked(previousIsLiked);
      setLikeCount((count) => count + (previousIsLiked ? 1 : -1));

      toast.error(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className={
        "bg-bg-sub border-border flex items-center gap-12 border-b px-5 py-8 lg:px-15 lg:py-16"
      }
    >
      <div className={"mx-auto flex w-full max-w-400 gap-5 md:gap-9 lg:gap-12"}>
        {/*프로필 이미지 파트*/}
        <div className="bg-text-sub relative h-30 w-30 shrink-0 overflow-hidden rounded-full">
          <Image
            src={artist.profileImageUrl}
            alt={artist.nameKo ?? artist.artistName}
            sizes={"120px"}
            fill
            className="object-cover"
          />
        </div>
        {/*이름, 태그, 팔로우 부분*/}
        <div className={"flex flex-1 flex-col justify-between gap-3 lg:gap-6"}>
          <div className={"flex justify-between gap-4"}>
            <div className={"flex flex-col gap-2 md:flex-row md:items-center md:gap-4"}>
              <h2 className={"text-2xl leading-none font-bold lg:text-4xl"}>
                {artist.nameKo ?? artist.artistName}
              </h2>
              {artist.artistGroup && (
                <div className={"flex gap-3"}>
                  <Badge
                    variant={"outline"}
                    className={"bg-background border-border border text-xs md:text-sm"}
                  >
                    {artist.artistGroup}
                  </Badge>
                </div>
              )}
            </div>
            <FollowButton isLiked={isLiked} disabled={isLoading} onClick={handleLikeClick} />
          </div>
          {/*팔로워 수, 다가올 콘서트 부분*/}
          <div className={"flex gap-6 lg:gap-8"}>
            <div className={"flex flex-col items-center justify-center gap-0 lg:gap-1"}>
              <span className={"text-text-main text-lg font-semibold lg:text-2xl"}>
                {likeCount}
              </span>
              <span className={"text-text-sub text-xs leading-normal"}>팔로워</span>
            </div>
            <Separator orientation={"vertical"} />
            <div className={"flex flex-col items-center justify-center gap-0 lg:gap-1"}>
              <span className={"text-text-main text-lg font-semibold lg:text-2xl"}>
                {upComingConcertCount}
              </span>
              <span className={"text-text-sub text-xs leading-normal"}>예정된 공연</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
