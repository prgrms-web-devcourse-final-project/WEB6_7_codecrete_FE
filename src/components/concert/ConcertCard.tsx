import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ConcertData } from "@/components/concert/ConcertType";

export default function ConcertCard({
  id,
  posterUrl,
  name,
  startDate,
  endDate,
  placeName,
}: ConcertData) {
  return (
    <Link
      href={`/concerts/${id}`}
      className="flex cursor-pointer flex-col gap-5 transition-opacity duration-300 hover:opacity-70"
    >
      <Image
        src={posterUrl}
        alt="Concert Poster"
        width={375}
        height={500}
        className="aspect-3/4 w-full rounded-lg"
      />
      <div className="flex flex-col gap-3">
        <strong className="text-2xl">{name}</strong>
        <div className="text-text-sub flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <p>{startDate === endDate ? startDate : `${startDate} ~ ${endDate}`}</p>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <p>{placeName}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
