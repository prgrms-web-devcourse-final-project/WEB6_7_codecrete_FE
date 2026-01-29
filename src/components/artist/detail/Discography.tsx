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
      <div className="space-y-4 lg:space-y-6">
        <h3 className="text-text-main text-xl font-bold lg:text-2xl">디스코그래피</h3>
        <p className="text-text-sub text-sm">등록된 앨범 정보가 없습니다.</p>
      </div>
    );
  }

  const visibleAlbums = expanded ? albums : albums.slice(0, 5);
  return (
    <div className="space-y-4 lg:space-y-6">
      <h3 className="text-text-main text-xl font-bold lg:text-2xl">디스코그래피</h3>
      <div className="flex w-full flex-col">
        <ItemGroup className="w-full gap-3 lg:gap-6">
          {visibleAlbums.map((album) => (
            <Item
              key={`${album.albumName}-${album.releaseDate}`}
              className="flex w-full gap-4 p-4 lg:gap-6 lg:p-6"
              variant="outline"
              role="listitem"
            >
              <ItemMedia variant="image" className={"relative h-20 w-20 shrink-0 lg:h-24 lg:w-24"}>
                <Image
                  fill
                  sizes={"96px"}
                  src={album.imageUrl}
                  alt={album.albumName}
                  className="h-full w-full border object-cover"
                />
              </ItemMedia>
              <div className="flex-1 space-y-1.5 lg:space-y-2">
                <ItemContent>
                  <ItemTitle className="text-base leading-tight lg:text-lg">
                    {album.albumName}
                  </ItemTitle>
                </ItemContent>
                <ItemContent>
                  <ItemDescription className="text-xs leading-tight lg:text-sm">
                    {album.albumType} · {album.releaseDate}
                  </ItemDescription>
                </ItemContent>
                <ItemContent>
                  <div className="flex items-center gap-1 text-xs leading-none lg:gap-2 lg:text-sm">
                    <Image
                      src="/spotify.svg"
                      alt="Spotify"
                      width={16}
                      height={16}
                      className="size-3 lg:size-4"
                    />
                    <Link
                      href={album.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      <span>Listen on Spotify</span>
                    </Link>
                  </div>
                </ItemContent>
              </div>
            </Item>
          ))}
        </ItemGroup>
        {albums.length > 5 && !expanded && (
          <Button
            onClick={() => setExpanded((prev) => !prev)}
            variant="outline"
            className="hover:text-text-main mt-4 self-center"
          >
            더보기
          </Button>
        )}
      </div>
    </div>
  );
}
