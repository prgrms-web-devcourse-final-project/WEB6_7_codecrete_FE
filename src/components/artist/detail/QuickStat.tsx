import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { Star } from "lucide-react";
import { ArtistDetail } from "@/types/artists";
import { Separator } from "@/components/ui/separator";

export default function QuickStat({ artist }: { artist: ArtistDetail }) {
  return (
    <div className="space-y-4 lg:space-y-6">
      <h3 className={"text-base font-bold lg:text-xl"}>아티스트 정보</h3>
      <Item variant={"outline"} className="p-4 lg:p-6">
        <ItemContent className={"flex flex-col items-center justify-between gap-3 lg:gap-6"}>
          {/*<div className={"flex w-full flex-row justify-between border-b pb-4"}>*/}
          {/*  <ItemDescription>데뷔 연도</ItemDescription>*/}
          {/*  <ItemTitle>{artist.}</ItemTitle>*/}
          {/*</div>*/}
          <div className={"flex w-full flex-row justify-between"}>
            <ItemDescription>총 앨범 수</ItemDescription>
            <ItemTitle>{artist.totalAlbums}</ItemTitle>
          </div>
          <Separator />
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
