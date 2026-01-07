import { CalendarIcon, MapPinIcon, Ticket, TicketsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConcertWithTicket } from "@/types/home";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { PLACEHOLDER_IMAGE } from "@/components/home/upcoming-slider/constants";
import { Card, CardContent } from "@/components/ui/card";
import { formatConcertPrice, formatDateRangeKorean } from "@/utils/helpers/formatters";

// TODO: 카드 hover 시 전체 클릭 UX 검토
// TODO: 공연 상태(예정/종료)에 따른 뱃지 추가 여부 검토
// TODO: 모바일에서 카드 레이아웃 세로형 전환 검토

export default function ArtistConcertItem({ concert }: { concert: ConcertWithTicket }) {
  const posterSrc = concert.posterUrl || PLACEHOLDER_IMAGE;

  return (
    <Card className="bg-bg-main flex flex-row gap-6 border p-6">
      <div className="relative w-35 shrink-0">
        <AspectRatio ratio={320 / 426.5}>
          <Image
            src={posterSrc}
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
              {concert.ticketTime != null && concert.ticketEndTime != null && (
                <li>
                  <TicketsIcon />
                  {formatDateRangeKorean(concert.ticketTime, concert.ticketEndTime)}
                </li>
              )}
              <li>
                <MapPinIcon />
                {concert.placeName}
              </li>
              {concert.minPrice != null && concert.maxPrice != null && (
                <li>
                  <Ticket />
                  {formatConcertPrice(concert.minPrice, concert.maxPrice)}
                </li>
              )}
            </ul>
          </div>
          <div className="flex gap-2">
            <Link href={`/concerts/${concert.id}`}>
              <Button>자세히 보기</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
