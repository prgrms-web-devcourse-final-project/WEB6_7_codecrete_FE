"use client";

import { ArtistAlbum } from "@/types/artists";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// TODO: 앨범 더보기/접기 시 애니메이션 추가

export default function Discography({ albums }: { albums: ArtistAlbum[] }) {
  const [expanded, setExpanded] = useState(false);
  if (!albums.length) {
    return (
      <div className="flex flex-col gap-6">
        <h3 className="text-2xl font-bold">디스코그래피</h3>
        <p className="text-text-sub text-sm">등록된 앨범 정보가 없습니다.</p>
      </div>
    );
  }

  const visibleAlbums = expanded ? albums : albums.slice(0, 5);
  return (
    <div className={"flex flex-col gap-6"}>
      <h3 className={"text-2xl font-bold"}>디스코그래피</h3>
      <div className="flex w-full flex-col">
        <ItemGroup className="w-full gap-6">
          {visibleAlbums.map((album) => (
            <Item
              key={album.albumName}
              className={"flex w-full gap-6 p-6"}
              variant="outline"
              role="listitem"
            >
              <ItemMedia variant="image" className={"relative h-24 w-24 shrink-0"}>
                <Image
                  fill
                  sizes={"96px"}
                  src={album.imageUrl}
                  alt={album.albumName}
                  className="border object-cover"
                />
              </ItemMedia>
              <div className={"flex flex-col gap-2"}>
                <ItemContent>
                  <ItemTitle className={"text-lg"}>{album.albumName}</ItemTitle>
                </ItemContent>
                <ItemContent>
                  <ItemDescription className={"text-sm"}>
                    {album.albumType} · {album.releaseDate}
                  </ItemDescription>
                </ItemContent>
                <ItemContent>
                  <div className={"flex items-center gap-2 text-sm"}>
                    <Image src="/spotify.svg" alt="Spotify" width={16} height={16} />
                    <Link
                      href={album.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={"hover:underline"}
                    >
                      <span>Listen on Spotify</span>
                    </Link>
                  </div>
                </ItemContent>
              </div>
            </Item>
          ))}
        </ItemGroup>
        {albums.length > 5 && (
          <Button
            onClick={() => setExpanded((prev) => !prev)}
            variant={"outline"}
            size={"lg"}
            className="hover:text-text-main mt-4 self-center text-sm font-medium font-semibold"
          >
            {expanded ? "접기" : "더보기"}
          </Button>
        )}
      </div>
    </div>
  );
}
