import { ConcertData } from "@/types/concerts";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ConcertCard({
  id,
  posterUrl,
  name,
  startDate,
  endDate,
  placeName,
}: ConcertData) {
  return (
    // 정렬 수정 시, 스켈레톤 사이즈 주의 <ConcertCardSkeleton/>
    <Link
      href={`/concerts/${id}`}
      className="flex cursor-pointer flex-col gap-3 transition-opacity duration-300 hover:opacity-70 lg:gap-5"
    >
      <Image
        src={posterUrl}
        alt="Concert Poster"
        width={375}
        height={500}
        className="aspect-3/4 w-full rounded-lg"
      />
      <div className="flex flex-col gap-1 lg:gap-3">
        <strong className="line-clamp-1 text-base md:text-lg lg:text-xl xl:text-2xl">{name}</strong>
        <div className="text-text-sub flex flex-col gap-1 text-xs leading-normal lg:text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="size-3 lg:size-4" />
            <p>{startDate === endDate ? startDate : `${startDate} ~ ${endDate}`}</p>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="size-3 lg:size-4" />
            <p>{placeName}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
