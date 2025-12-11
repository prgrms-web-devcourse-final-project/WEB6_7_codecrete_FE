import { Clock4, Heart, MapPin, Ticket, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Item } from "@/components/ui/item";

export default function ArtistConcertItem() {
  return (
    <Item variant={"outline"} className={"hover:border-text-main h-54 items-start gap-8 p-6"}>
      {/*왼쪽 날짜 파트*/}
      <div className={"flex w-32 flex-col items-center justify-center gap-1"}>
        <span className={"text-text-sub"}>MAR</span>
        <span className={"text-text-main text-3xl"}>15</span>
        <span className={"text-text-sub text-xs"}>19:00</span>
      </div>
      {/*오른쪽 정보 파트*/}
      <div className={"flex flex-1 flex-col gap-4"}>
        {/*위쪽 파트*/}
        <div className={"flex justify-between"}>
          <div className={"flex flex-col gap-2"}>
            <span className={"bold text-2xl"}>Echoes of Tommorow - Seoul</span>
            <div className={"flex gap-4"}>
              <div className={"flex items-center justify-center gap-2"}>
                <MapPin size={14} className={"text-text-sub"} />
                <span className={"text-text-sub"}>Olympic Hall Seoul</span>
              </div>
              <div className={"flex items-center justify-center gap-2"}>
                <Users size={14} className={"text-text-sub"} />
                <span className={"text-text-sub"}>2,500 seats</span>
              </div>
            </div>
            <div className={"flex gap-2"}>
              <div className={"bg-text-point-sub flex h-6 w-40 items-center justify-center"}>
                <span>Tickets Available</span>
              </div>
              <div className={"bg-text-point-sub flex h-6 w-40 items-center justify-center"}>
                <span>Featured Concert</span>
              </div>
            </div>
          </div>
          <div className={"flex flex-col gap-2"}>
            <div className={"flex justify-end"}>
              <span className={"text-2xl"}>₩65,000</span>
            </div>
            <div className={"flex justify-end"}>
              <span className={"text-text-sub"}>Starting from</span>
            </div>
            <Button size={"lg"} type={"button"} className={"cursor-pointer"}>
              View Details
            </Button>
          </div>
        </div>
        {/*아래쪽 파트*/}
        <div className={"flex gap-6 border-t pt-4"}>
          <div className={"text-text-sub flex items-center justify-center gap-2"}>
            <Clock4 size={14} />
            <span>Duration: 2h 30m</span>
          </div>
          <div className="text-text-sub flex items-center justify-center gap-2">
            <Ticket size={14} />
            <span>1,204 tickets sold</span>
          </div>
          <div className="text-text-sub flex items-center justify-center gap-2">
            <Heart size={14} />
            <span>3,127 interested</span>
          </div>
        </div>
      </div>
    </Item>
  );
}
