import { Card, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import InfoRow from "@/components/concert/chat/InfoRow";
import { Calendar, MapPin, SquareArrowOutUpRight, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ConcertInfoCard() {
  return (
    <Card className={"gap-4 p-7"}>
      <CardTitle className={"text-text-main text-xl font-bold"}>공연 정보</CardTitle>
      <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-gray-200">
        <Image src={"/images/slide02.gif"} alt="공연 포스터" fill className="object-cover" />
      </div>
      <h3 className={"text-xl font-semibold"}>The Midmight Echo Live</h3>
      <div className={"flex flex-col gap-3"}>
        <InfoRow
          icon={<Calendar size={20} />}
          title="2025년 3월 15일 (토)"
          sub="오후 8:00 - 오후 11:00 (EST)"
        />
        <InfoRow icon={<MapPin size={20} />} title="Madison Square Garden" sub="New York, NY" />
      </div>
      <Button
        size={"lg"}
        variant={"outline"}
        type={"button"}
        className={"flex h-15 justify-between p-4"}
      >
        <div className={"flex gap-3"}>
          <span className="inline-flex items-center">
            <Ticket className={"h-5! w-5!"} />
          </span>
          <span className={"text-base font-semibold"}>공식 예매처로 이동</span>
        </div>
        <span className="inline-flex items-center">
          <SquareArrowOutUpRight className={"text-text-sub h-5! w-5!"} />
        </span>
      </Button>
    </Card>
  );
}
