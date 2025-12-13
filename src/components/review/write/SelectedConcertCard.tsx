import { CardContent } from "@/components/ui/card";
import { Calendar, Clock4 } from "lucide-react";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import Image from "next/image";

export default function SelectedConcertCard() {
  return (
    // TODO: 아래 부분은 select로 클릭했을 시 보여주는 아이템 클릭 안되면 안보이게 하기
    // TODO: 위에 있는 SELCET에서 클릭한 id에 해당하는 콘서트를 보여주기
    <CardContent>
      <Item className={"bg-bg-sub flex w-full gap-6 p-6"} variant="outline" role="listitem">
        <ItemMedia variant="image" className={"relative h-20 w-20 shrink-0"}>
          <Image
            src={"/Madvillainy_cover.png"}
            alt={"concert"}
            width={80}
            height={80}
            className="object-cover"
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className={"text-lg"}>IU HEREH World Tour</ItemTitle>
          <ItemDescription>Seoul Olympic Stadium</ItemDescription>
          <div className={"flex gap-4"}>
            <ItemDescription className={"flex items-center justify-center gap-2 text-xs"}>
              <Calendar size={12} />
              <span>March 15, 2025</span>
            </ItemDescription>
            <ItemDescription className={"flex items-center justify-center gap-2 text-xs"}>
              <Clock4 size={12} />
              <span>19:00</span>
            </ItemDescription>
          </div>
        </ItemContent>
      </Item>
    </CardContent>
  );
}
