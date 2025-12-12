import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";

export default function ConcertCard({
  image,
  title,
  date,
  location,
}: {
  image: string;
  title: string;
  date: string;
  location: string;
}) {
  return (
    <div className="flex cursor-pointer flex-col gap-5">
      <Image
        src={image}
        alt="Concert Poster"
        width={375}
        height={300}
        className="min-h-[300px] w-full"
      />
      <div className="flex flex-col gap-3">
        <strong className="text-2xl">{title}</strong>
        <div className="text-text-sub flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <p>{date}</p>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <p>{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
