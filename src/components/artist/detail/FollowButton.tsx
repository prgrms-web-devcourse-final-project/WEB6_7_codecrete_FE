"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { toggleArtistLike } from "@/lib/api/artists/artists.server";

type FollowButtonProps = {
  artistId: number;
  initialLiked?: boolean;
  onLikeChange?: (nextIsLiked: boolean) => void;
};

export default function FollowButton({
  artistId,
  initialLiked = false,
  onLikeChange,
}: FollowButtonProps) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLiked(initialLiked);
  }, [initialLiked]);

  const handleLikeClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading) return;

    e.preventDefault();
    e.stopPropagation();

    setIsLoading(true);
    try {
      // TODO: API 실패 시 optimistic UI 롤백 처리 (isLiked / 부모 likeCount 동기화)
      // TODO: 연속 클릭 방지 강화 (AbortController 또는 요청 중복 취소)
      await toggleArtistLike(artistId, isLiked);

      const nextIsLiked = !isLiked;
      setIsLiked(nextIsLiked);
      onLikeChange?.(nextIsLiked);

      toast.success(nextIsLiked ? "아티스트를 좋아요 했습니다!" : "좋아요를 취소했습니다.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type={"button"}
      onClick={handleLikeClick}
      className={"text-base"}
      disabled={isLoading}
      size={"lg"}
    >
      <Heart className={twMerge(isLiked ? "fill-current" : "fill-none")} />{" "}
      <span>{isLiked ? "언팔로우" : "팔로우"}</span>
    </Button>
  );
}
