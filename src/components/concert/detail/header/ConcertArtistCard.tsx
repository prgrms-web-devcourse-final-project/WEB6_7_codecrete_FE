"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toggleArtistLike } from "@/lib/api/artists/artists.server";
import { ArtistDetail } from "@/types/artists";
import { Loader2Icon, Music, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function ConcertArtistCard({
  artist,
}: {
  artist: ArtistDetail & { liked: boolean };
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(artist.liked);

  const name = artist.nameKo || artist.artistName;
  const fallback = (name || "?").slice(0, 2).toUpperCase();
  const albumsText = artist.totalAlbums ? `${artist.totalAlbums} Albums` : null;

  const handleLikeClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) return;

    setIsLoading(true);
    try {
      await toggleArtistLike(artist.id, isLiked);

      const nextIsLiked = !isLiked;
      setIsLiked(nextIsLiked);

      toast.success(nextIsLiked ? "아티스트를 좋아요 했습니다!" : "좋아요를 취소했습니다.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Link
      href={`/artists/${artist.id}`}
      className="border-border flex justify-between border-b py-4 last:border-0"
    >
      <div className="flex gap-4">
        <Avatar className="ring-border size-16 ring-4">
          <AvatarImage src={artist.profileImageUrl} alt={name} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <strong className="text-lg">{name}</strong>
          <div className="text-text-sub flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {artist.likeCount.toLocaleString()} Likes
            </span>
            {albumsText ? (
              <span className="flex items-center gap-1">
                <Music className="h-4 w-4" />
                {albumsText}
              </span>
            ) : null}
          </div>
          <p className="text-text-sub line-clamp-3 text-sm">{artist.description}</p>
        </div>
      </div>
      <Button
        variant={isLiked ? "default" : "outline"}
        size="sm"
        className="border-border-point px-4 py-2"
        onClick={(e) => handleLikeClick(e)}
        disabled={isLoading}
      >
        {isLoading ? (
          isLiked ? (
            <>
              <Loader2Icon className="animate-spin" />
              팔로잉
            </>
          ) : (
            <>
              <Loader2Icon className="animate-spin" />
              팔로우
            </>
          )
        ) : isLiked ? (
          "팔로잉"
        ) : (
          "팔로우"
        )}
      </Button>
    </Link>
  );
}
