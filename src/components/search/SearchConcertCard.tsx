import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, MapPinIcon, Ticket, TicketsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ConcertDataWithLiked } from "../concert/ConcertType";
import { PLACEHOLDER_IMAGE } from "../home/upcoming-slider/constants";
import { formatConcertPrice, formatDateRangeKorean } from "@/utils/helpers/formatters";
import ConcertLikeButton from "../concert/detail/ConcertLikeButton";
import { AspectRatio } from "../ui/aspect-ratio";

export default function SearchConcertCard({
  concert,
  isAuthenticated,
}: {
  concert: ConcertDataWithLiked;
  isAuthenticated: boolean;
}) {
  const concertId = concert.id.toString();

  return (
    <Card className="flex flex-row gap-6 p-6">
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
            <ul className="text-text-sub space-y-1 text-sm [&>li]:flex [&>li]:items-center [&>li]:gap-1 [&>li>svg]:size-4">
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
          <Link href={`/concerts/${concert.id}`}>
            <Button>자세히보기</Button>
          </Link>
        </div>
        <ConcertLikeButton
          concertId={concertId}
          isAuthenticated={isAuthenticated}
          isLiked={concert.isLiked}
        />
      </CardContent>
    </Card>
  );
}
