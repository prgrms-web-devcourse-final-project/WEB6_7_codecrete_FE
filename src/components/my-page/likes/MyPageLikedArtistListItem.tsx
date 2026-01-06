"use client";
import { toggleArtistLike } from "@/lib/api/artists/artists.server";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { HeartIcon, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LikedArtist } from "@/types/my-page";

export default function MyPageLikedArtistListItem({ artist }: { artist: LikedArtist }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(artist.isLiked);
  const [imgSrc, setImgSrc] = useState(artist.imageUrl || "/images/artist-placeholder.png");

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
      className="group flex flex-col gap-5 transition hover:opacity-90"
    >
      <div className="border-border/60 relative aspect-square overflow-hidden rounded-lg border">
        <Image
          src={imgSrc}
          alt={artist.artistName}
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
          className="object-cover"
          onError={() => setImgSrc("/images/artist-placeholder.png")}
        />
        <Button
          onClick={handleLikeClick}
          disabled={isLoading}
          type="button"
          aria-label="아티스트 좋아요"
          className={cn(
            "absolute top-2 right-2 h-9 w-9 rounded-full bg-black/20 backdrop-blur-sm transition-all duration-200 group-hover:scale-100 group-hover:opacity-100",
            isLoading ? "opacity-100" : "opacity-0"
          )}
        >
          {isLoading ? (
            <Loader2Icon className="h-5 w-5 animate-spin text-white" />
          ) : (
            <HeartIcon
              className={cn(
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
