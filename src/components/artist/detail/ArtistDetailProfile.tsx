"use client";

import { Separator } from "@/components/ui/separator";
import { ArtistDetail } from "@/types/artists";
import Image from "next/image";
import FollowButton from "@/components/artist/detail/FollowButton";
import { useState } from "react";

export default function ArtistDetailProfile({
  artist,
  artistId,
}: {
  artist: ArtistDetail;
  artistId: number;
}) {
  const [likeCount, setLikeCount] = useState(artist.likeCount);
  return (
    <section className={"bg-bg-sub border-border flex items-center gap-12 border-b px-15 py-16"}>
      <div className={"mx-auto flex w-full max-w-400 gap-12"}>
        {/*프로필 이미지 파트*/}
        <div className="bg-text-sub relative h-30 w-30 overflow-hidden rounded-full">
          <Image
            src={artist.profileImageUrl}
            alt={artist.artistName}
            sizes={"120px"}
            fill
            className="object-cover"
          />
        </div>
        {/*이름, 태그, 팔로우 부분*/}
        <div className={"flex flex-1 flex-col gap-6"}>
          <div className={"flex justify-between gap-4"}>
            <div className={"flex flex-col gap-4"}>
              <h2 className={"text-4xl font-bold"}>{artist.artistName}</h2>
              {/*<div className={"flex gap-3"}>*/}
              {/*  <Badge className={"bg-text-point-sub text-text-main text-sm"}>솔로 아티스트</Badge>*/}
              {/*  <Badge className={"bg-text-point-sub text-text-main text-sm"}>팝</Badge>*/}
              {/*  <Badge className={"bg-text-point-sub text-text-main text-sm"}>R&B</Badge>*/}
              {/*</div>*/}
            </div>
            <FollowButton
              artistId={artistId}
              // TODO : 나중에 initialLiked 값엔 서버에서 받아온 팔로우 상태값 전달
              // TODO: 좋아요 API 실패 시 likeCount 롤백 처리
              // TODO: 다른 화면과 좋아요 상태/카운트 동기화 전략 정리
              initialLiked={false}
              onLikeChange={(nextIsLiked) => {
                setLikeCount((count) => count + (nextIsLiked ? 1 : -1));
              }}
            />
          </div>
          {/*팔로워 수, 다가올 콘서트 부분*/}
          <div className={"flex gap-8"}>
            <div className={"flex flex-col items-center justify-center gap-1"}>
              <span className={"text-text-main text-2xl font-semibold"}>{likeCount}</span>
              <span className={"text-text-sub"}>팔로워</span>
            </div>
            <Separator orientation={"vertical"} />
            <div className={"flex flex-col items-center justify-center gap-1"}>
              {/*TODO: 아래 공연 수 값은 나중에 데이터로 불러오기*/}
              <span className={"text-text-main text-2xl font-semibold"}>정보 준비중</span>
              <span className={"text-text-sub"}>예정된 공연</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
