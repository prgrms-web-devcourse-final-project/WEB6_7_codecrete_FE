// TODO: 포스터 이미지 로딩 실패 시 fallback 이미지 처리

import { Card, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import InfoRow from "@/components/concert/chat/InfoRow";
import { Calendar, MapPin, SquareArrowOutUpRight, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConcertDetail, TicketOffice } from "@/types/concerts";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useState } from "react";
import { TicketOfficeDialog } from "@/components/concert/chat/TicketOfficeDialog";

export default function ConcertInfoCard({
  concert,
  ticketOffices,
}: {
  concert: ConcertDetail | null;
  ticketOffices: TicketOffice[] | null;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Card className={"gap-4 p-7"}>
      <CardTitle className={"text-text-main text-xl font-bold"}>공연 정보</CardTitle>
      <div className="relative aspect-video overflow-hidden rounded-md bg-black">
        {/* 배경용 이미지 (blur) */}
        <Image
          src={concert?.posterUrl ?? "/images/slide02.gif"}
          alt="배경 이미지"
          fill
          sizes="(max-width: 640px) 100vw, 400px"
          className="scale-110 object-cover opacity-40 blur-xl"
        />

        {/* 실제 포스터 */}
        <Image
          src={concert?.posterUrl ?? "/images/slide02.gif"}
          alt="공연 포스터"
          fill
          sizes="(max-width: 640px) 100vw, 400px"
          className="object-contain"
        />
      </div>
      <h3 className={"line-clamp-1 text-xl font-semibold"}>{concert?.name}</h3>
      <div className={"flex flex-col gap-3"}>
        <InfoRow
          icon={<Calendar size={20} />}
          title={format(new Date("2026-02-08"), "yyyy년 M월 d일 (EEE)", { locale: ko }) ?? "-"}
        />
        <InfoRow icon={<MapPin size={20} />} title={concert?.placeAddress ?? "-"} />
      </div>
      <Button
        size={"lg"}
        variant={"outline"}
        type={"button"}
        onClick={() => setOpen(true)}
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

      <TicketOfficeDialog open={open} onOpenChange={setOpen} ticketOffices={ticketOffices} />
    </Card>
  );
}
