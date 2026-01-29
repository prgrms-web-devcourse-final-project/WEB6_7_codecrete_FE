import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import QrCode from "@/components/ui/qr-code";
import { ConcertWithTicket } from "@/types/home";
import { formatDateRange } from "@/utils/helpers/formatters";
import { DEFAULT_TICKET_URL, PLACEHOLDER_IMAGE } from "./constants";
import { cn } from "@/lib/utils";

interface ConcertTicketCardProps {
  concert: ConcertWithTicket;
}

interface TicketOverlayProps {
  concert: ConcertWithTicket;
  dateString: string;
}

export default function ConcertTicketCard({ concert }: ConcertTicketCardProps) {
  const dateString = formatDateRange(concert.startDate, concert.endDate);

  return (
    <Link href={`/concerts/${concert.id}`} className="group relative block w-64 md:w-72 lg:w-80">
      {/* 포스터 이미지 */}
      <AspectRatio ratio={320 / 426.5}>
        <Image
          src={concert.posterUrl ?? PLACEHOLDER_IMAGE}
          alt={concert.name}
          className="rounded-2xl object-cover"
          fill
          placeholder="blur"
          blurDataURL={PLACEHOLDER_IMAGE}
          sizes="(max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = PLACEHOLDER_IMAGE;
          }}
        />
      </AspectRatio>

      {/* 호버 오버레이 */}
      <TicketOverlay concert={concert} dateString={dateString} />

      {/* 티켓 모서리 꾸밈 */}
      <TicketCorners />
    </Link>
  );
}

function TicketOverlay({ concert, dateString }: TicketOverlayProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col bg-zinc-900/30 backdrop-blur-xs transition-opacity duration-300",
        // 기본: 숨김
        "opacity-0",
        // 모바일: swiper-slide-active 또는 swiper-slide-next일 때 표시
        "in-[.swiper-slide-active]:opacity-100",
        "in-[.swiper-slide-next]:opacity-100",
        // 데스크톱: 위 규칙 무시하고 호버만
        "lg:in-[.swiper-slide-active]:opacity-0",
        "lg:in-[.swiper-slide-next]:opacity-0",
        "lg:group-hover:opacity-100"
      )}
    >
      {/* 상단 - 공연명 */}
      <div className="flex h-[58.8%] items-center justify-center p-4 md:p-6">
        <h3 className="line-clamp-3 text-center text-xl font-semibold text-white md:text-2xl">
          {concert.name}
        </h3>
      </div>

      {/* 중간 - 티켓 펀칭 */}
      <TicketPunch />

      {/* 하단 - 정보 */}
      <div className="border-t-bg-main flex h-[41.2%] items-center justify-between gap-5 border-t border-dashed p-4 md:p-6">
        <ul className="flex-1 space-y-3 text-white md:space-y-5.5">
          <li className="space-y-1 md:space-y-2">
            <strong className="text-sm font-semibold md:text-base">Date</strong>
            <p className="text-xs md:text-sm">{dateString}</p>
          </li>
          <li className="space-y-1 md:space-y-2">
            <strong className="text-sm font-semibold md:text-base">Venue</strong>
            <p className="line-clamp-2 text-xs md:text-sm">{concert.placeName}</p>
          </li>
        </ul>
        <QrCode
          address={concert.ticketOfficeUrl || DEFAULT_TICKET_URL}
          size={56}
          className="size-18 lg:size-20"
        />
      </div>
    </div>
  );
}

function TicketPunch() {
  return (
    <div className="absolute top-[58.8%] left-0 -mt-4 w-full">
      <div className="bg-bg-main absolute -right-4 h-8 w-8 rounded-full" />
      <div className="bg-bg-main absolute -left-4 h-8 w-8 rounded-full" />
    </div>
  );
}

function TicketCorners() {
  const cornerClass = "absolute h-8 w-8 rounded-full bg-background";

  return (
    <div className="pointer-events-none">
      <div className={cn(cornerClass, "-top-4 -left-4")} />
      <div className={cn(cornerClass, "-top-4 -right-4")} />
      <div className={cn(cornerClass, "-bottom-4 -left-4")} />
      <div className={cn(cornerClass, "-right-4 -bottom-4")} />
    </div>
  );
}
