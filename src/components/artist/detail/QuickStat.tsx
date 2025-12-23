import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { Star } from "lucide-react";
import { ArtistDetail } from "@/types/artists";

export default function QuickStat({ artist }: { artist: ArtistDetail }) {
  return (
    <div className={"flex flex-col gap-6"}>
      <h3 className={"text-xl font-bold"}>아티스트 정보</h3>
      <Item variant={"outline"} className={"p-6"}>
        <ItemContent className={"flex flex-col items-center justify-between gap-6"}>
          {/*<div className={"flex w-full flex-row justify-between border-b pb-4"}>*/}
          {/*  <ItemDescription>데뷔 연도</ItemDescription>*/}
          {/*  <ItemTitle>{artist.}</ItemTitle>*/}
          {/*</div>*/}
          <div className={"flex w-full flex-row justify-between border-b pb-4"}>
            <ItemDescription>총 앨범 수</ItemDescription>
            <ItemTitle>{artist.totalAlbums}</ItemTitle>
          </div>
          <div className={"flex w-full flex-row justify-between"}>
            <ItemDescription>인기도</ItemDescription>
            <ItemTitle>
              <Star size={12} fill="currentColor" />{" "}
              {Number(((artist.popularityRating / 100) * 5).toFixed(1))}
            </ItemTitle>
          </div>
        </ItemContent>
      </Item>
    </div>
  );
}
