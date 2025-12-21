"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import React, { useState } from "react";
import { ArtistListItem } from "@/types/artists";
import { likeArtist } from "@/lib/artists/artists";
import { toast } from "sonner";

// TODO:
//  - 아티스트 좋아요(팔로우) 상태를 서버에서 함께 내려받아 초기 상태로 관리해야 함
//  - 좋아요 상태에 따라 하트 아이콘을 빨간색(fill-red-500)으로 표시
//  - 이미 좋아요된 상태에서 버튼 클릭 시 좋아요 취소(unlike) API 호출하도록 분기 처리
//  - 좋아요/취소 시 optimistic update 적용 검토
//  - 실제 서버에서 받은 초기 like 상태를 props나 state로 관리하기

export default function ArtistListCard({ artist }: { artist: ArtistListItem }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) return;

    setIsLoading(true);
    try {
      // TODO: isLiked 상태에 따라 API 호출 분기 (likeArtist / unlikeArtist)
      await likeArtist(artist.id);

      setIsLiked(!isLiked);
      toast.success(isLiked ? "좋아요를 취소했습니다." : "아티스트를 좋아요 했습니다!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Link
      key={artist.id}
      href={`/artists/${artist.id}`}
      className="group flex flex-col gap-5 transition hover:opacity-90"
    >
      <div className="border-border/60 relative aspect-square overflow-hidden rounded-lg border">
        <Image
          src={artist.imageUrl || "/images/artist-placeholder.png"}
          alt={artist.artistName}
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
          className="object-cover"
        />
        <Button
          onClick={handleLikeClick}
          disabled={isLoading}
          type="button"
          aria-label="아티스트 좋아요"
          className={twMerge(
            "absolute top-2 right-2 h-9 w-9 scale-90 rounded-full bg-black/20 backdrop-blur-sm transition-all duration-200 group-hover:scale-100 group-hover:opacity-100",
            isLoading ? "opacity-100" : "opacity-0"
          )}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-white" />
          ) : (
            <Heart
              className={twMerge(
                "h-5 w-5 transition",
                isLiked ? "fill-red-500 text-red-500" : "fill-white text-white"
              )}
              strokeWidth={0}
            />
          )}
        </Button>
      </div>
      <strong className="line-clamp-1 text-2xl">{artist.artistName}</strong>
    </Link>
  );
}
