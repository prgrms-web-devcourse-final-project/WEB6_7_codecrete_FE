"use client";
import { PLACEHOLDER_IMAGE } from "@/components/home/upcoming-slider/constants";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ConcertWithTicket } from "@/types/my-page";
import { formatConcertPrice, formatDateRangeKorean } from "@/utils/helpers/formatters";
import { Ticket, CalendarIcon, MapPinIcon, TicketsIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MyPageConcertCard({
  concert,
  onCreatePlan,
}: {
  concert: ConcertWithTicket;
  onCreatePlan: () => void;
}) {
  return (
    <Card className="bg-bg-main flex flex-row gap-6 border p-6">
      <div className="relative w-35 shrink-0">
        <AspectRatio ratio={320 / 426.5}>
          <Image
            src={concert.posterUrl ?? PLACEHOLDER_IMAGE}
            alt={concert.name}
            className="rounded-2xl object-cover"
            fill
            placeholder="blur"
            blurDataURL={PLACEHOLDER_IMAGE}
            sizes="(max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
          />
        </AspectRatio>
      </div>
      <CardContent className="flex flex-1 justify-between p-0">
        <div className="flex flex-col justify-between gap-2">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">{concert.name}</h3>
            <ul className="text-text-sub space-y-1 text-sm [&>li]:flex [&>li]:items-center [&>li]:gap-2 [&>li>svg]:size-4">
              <li>
                <CalendarIcon />
                {formatDateRangeKorean(concert.startDate, concert.endDate)}
              </li>
              {concert.ticketTime && concert.ticketEndTime && (
                <li>
                  <TicketsIcon />
                  {formatDateRangeKorean(concert.ticketTime, concert.ticketEndTime)}
                </li>
              )}
              <li>
                <MapPinIcon />
                {concert.placeName}
              </li>
              {concert.minPrice && concert.maxPrice && (
                <li>
                  <Ticket />
                  {formatConcertPrice(concert.minPrice, concert.maxPrice)}
                </li>
              )}
            </ul>
          </div>
          <div className="flex gap-2">
            <Link href={`/concerts/${concert.id}`}>
              <Button>자세히보기</Button>
            </Link>
            <Button variant="outline" type="button" onClick={onCreatePlan}>
              계획 추가하기
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
