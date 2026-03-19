import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, MapPinIcon, Ticket, TicketsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatConcertPrice, formatDateRangeKorean } from "@/utils/helpers/formatters";
import { ConcertDetail } from "@/types/concerts";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PLACEHOLDER_CONCERT } from "@/constants/placeholder";

export default function MeetingConcertCard({ concertDetail }: { concertDetail: ConcertDetail }) {
  return (
    <Card className="relative flex flex-col gap-4 p-4 sm:flex-row lg:gap-6 lg:p-6">
      <div className="relative w-full shrink-0 sm:w-35">
        <AspectRatio ratio={320 / 426.5}>
          <Image
            src={concertDetail.posterUrl ?? PLACEHOLDER_CONCERT}
            alt={concertDetail.name}
            className="rounded-2xl object-cover"
            fill
            placeholder="blur"
            blurDataURL={PLACEHOLDER_CONCERT}
            sizes="(max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
          />
        </AspectRatio>
      </div>
      <CardContent className="flex w-full flex-1 px-0 sm:justify-between">
        <div className="flex flex-1 flex-col items-start justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-base font-bold sm:text-lg lg:text-2xl">{concertDetail.name}</h3>
            <ul className="text-text-sub space-y-1 text-sm break-keep [&>li]:grid [&>li]:grid-cols-[auto_1fr] [&>li]:gap-1 [&>li>svg]:size-5 [&>li>svg]:py-0.5">
              <li>
                <CalendarIcon />
                {formatDateRangeKorean(concertDetail.startDate, concertDetail.endDate)}
              </li>
              {concertDetail.ticketTime && concertDetail.ticketEndTime && (
                <li>
                  <TicketsIcon />
                  {formatDateRangeKorean(concertDetail.ticketTime, concertDetail.ticketEndTime)}
                </li>
              )}
              <li>
                <MapPinIcon />
                {concertDetail.placeName}
              </li>
              {concertDetail.minPrice && concertDetail.maxPrice && (
                <li>
                  <Ticket />
                  {formatConcertPrice(concertDetail.minPrice, concertDetail.maxPrice)}
                </li>
              )}
            </ul>
          </div>
          <Link
            href={`/concerts/${concertDetail.concertId}`}
            className="block w-full sm:inline-block"
          >
            <Button className="w-full sm:w-auto">자세히보기</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
