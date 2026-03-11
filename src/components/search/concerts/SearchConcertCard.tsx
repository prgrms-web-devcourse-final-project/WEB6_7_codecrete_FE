import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, MapPinIcon, Ticket, TicketsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatConcertPrice, formatDateRangeKorean } from "@/utils/helpers/formatters";
import { ConcertDataWithLiked } from "@/types/concerts";
import { PLACEHOLDER_IMAGE } from "@/components/home/upcoming-slider/constants";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ConcertLikeButton from "@/components/concert/detail/ConcertLikeButton";

export default function SearchConcertCard({
  concert,
  isAuthenticated,
}: {
  concert: ConcertDataWithLiked;
  isAuthenticated: boolean;
}) {
  const concertId = concert.id.toString();

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
      <CardContent className="flex w-full flex-1 px-0 sm:justify-between">
        <div className="flex flex-1 flex-col items-start justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-base font-bold sm:text-lg lg:text-2xl">{concert.name}</h3>
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
          <Link
            href={`/concerts/${concert.id}`}
            className="block w-full pr-12 sm:inline-block sm:pr-0"
          >
            <Button className="w-full sm:w-auto">자세히보기</Button>
          </Link>
        </div>
        <ConcertLikeButton
          concertId={concertId}
          isAuthenticated={isAuthenticated}
          isLiked={concert.isLiked}
          className="absolute right-4 bottom-4 sm:static"
        />
      </CardContent>
    </Card>
  );
}
