"use client";

import Link from "next/link";
import { ArtistListItem } from "@/types/artists";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";
import { likeArtist } from "@/lib/artists/artists";
import { toast } from "sonner";
import React from "react";

// TODO:
//  - 아티스트 좋아요(팔로우) 상태를 서버에서 함께 내려받아 초기 상태로 관리해야 함
//  - 좋아요 상태에 따라 하트 아이콘을 빨간색(fill-red-500)으로 표시
//  - 이미 좋아요된 상태에서 버튼 클릭 시 좋아요 취소(unlike) API 호출하도록 분기 처리
//  - 좋아요/취소 시 optimistic update 적용 검토

export default function ArtistListItems({ artists }: { artists: ArtistListItem[] }) {
  // TODO:
  //  - 현재는 likeArtist만 호출 중
  //  - 추후 isLiked 상태에 따라
  //    - true  -> unlikeArtist(id) 호출
  //    - false -> likeArtist(id) 호출
  //  - 서버에서 내려주는 msg에 따라 toast 메시지 분기 처리
  const likeArtistAction = async (id: number) => {
    try {
      // TODO: isLiked 상태에 따라 like / unlike 분기 필요
      await likeArtist(id);
      toast.success("아티스트를 좋아요 했어요!");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const handleLikeClick = async (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault();
    e.stopPropagation();

    // TODO:
    //  - 중복 클릭 방지를 위한 loading 상태 추가
    //  - 요청 중에는 버튼 disabled 처리
    await likeArtistAction(id);
  };

  return (
    <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {artists.map((artist) => (
        <Link
          key={artist.id}
          href={`/artists/${artist.id}`}
          className="group flex flex-col gap-5 transition hover:opacity-90"
        >
          <div className="border-border/60 relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={artist.imageUrl || "/images/artist-placeholder.png"}
              alt="Concert Poster"
              fill
              sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
              className="object-cover"
            />
            <Button
              onClick={(e) => handleLikeClick(e, artist.id)}
              type="button"
              aria-label="아티스트 좋아요"
              className="absolute top-2 right-2 h-9 w-9 scale-90 rounded-full bg-black/20 opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:scale-100 group-hover:opacity-100"
            >
              <Heart
                className={twMerge(
                  "h-5 w-5 transition",
                  // TODO: isLiked === true 일 때 fill-red-500 text-red-500 적용
                  // TODO: isLiked === false 일 때 fill-white text-white 적용
                  "fill-white text-white"
                )}
                strokeWidth={0}
              />
            </Button>
          </div>
          <strong className="line-clamp-1 text-2xl">{artist.artistName}</strong>
        </Link>
      ))}
    </div>
  );
}
