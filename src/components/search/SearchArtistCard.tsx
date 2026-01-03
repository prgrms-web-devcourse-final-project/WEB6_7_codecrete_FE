"use client";

import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Button } from "../ui/button";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { HeartIcon, Loader2Icon } from "lucide-react";

export default function SearchArtistCard({
  artist,
}: {
  artist: { id: string; artistName: string; imageUrl?: string };
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLikeArtist = () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      setIsLiked(!isLiked);
    } catch (err) {
      console.error(err);
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
        <AspectRatio ratio={1 / 1}>
          <Image
            src={artist.imageUrl || "/images/artist-placeholder.png"}
            alt={artist.artistName}
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
            className="object-cover"
          />
        </AspectRatio>
        <Button
          onClick={handleLikeArtist}
          disabled={isLoading}
          type="button"
          aria-label="아티스트 좋아요"
          className={twMerge(
            "absolute top-2 right-2 h-9 w-9 rounded-full bg-black/20 backdrop-blur-sm transition-all duration-200 group-hover:scale-100 group-hover:opacity-100"
            // isLoading ? "opacity-100" : "opacity-0"
          )}
        >
          {isLoading ? (
            <Loader2Icon className="h-5 w-5 animate-spin text-white" />
          ) : (
            <HeartIcon
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
