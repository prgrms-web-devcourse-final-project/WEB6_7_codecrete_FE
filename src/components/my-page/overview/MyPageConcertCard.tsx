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
    <Card className="relative flex flex-col gap-4 p-4 sm:flex-row lg:gap-6 lg:p-6">
      <div className="relative w-full shrink-0 sm:w-35">
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
      <CardContent className="relative flex w-full flex-1 px-0 sm:justify-between">
        <div className="flex flex-1 flex-col items-start justify-between gap-4">
          <div className="space-y-2">
            <h4 className="text-base font-bold sm:text-lg lg:text-2xl">{concert.name}</h4>
            <ul className="text-text-sub space-y-1 text-sm break-keep [&>li]:grid [&>li]:grid-cols-[auto_1fr] [&>li]:gap-1 [&>li>svg]:size-5 [&>li>svg]:py-0.5">
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
          <div className="grid w-full grid-cols-2 gap-2 md:flex md:w-auto">
            <Link href={`/concerts/${concert.id}`}>
              <Button className="w-full">자세히보기</Button>
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
