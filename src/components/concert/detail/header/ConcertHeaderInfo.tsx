import { ConcertInfoItem } from "@/types/concerts";
import { MapPin, CalendarClockIcon, Calendar1Icon, TicketPercentIcon } from "lucide-react";

const iconMap = {
  date: <Calendar1Icon className="stroke-point-main lg:size-6" />,
  location: <MapPin className="stroke-point-main lg:size-6" />,
  price: <TicketPercentIcon className="stroke-point-main lg:size-6" />,
  ticketing: <CalendarClockIcon className="stroke-point-main lg:size-6" />,
};

export default function ConcertHeaderInfo({ type, label, title }: ConcertInfoItem) {
  if (type === "ticketing") {
    const parts = title.split(" ~ ");

    if (parts.length >= 2) {
      const [start, ...rest] = parts;
      const end = rest.join(" ~ ");

      return (
        <div className="flex items-center gap-4">
          <div className="bg-bg-sub flex size-15 items-center justify-center rounded-full">
            {iconMap[type]}
          </div>
          <div className="space-y-1">
            <h3 className="text-text-sub text-xs leading-normal font-medium">{label}</h3>
            <strong className="flex flex-col text-base">
              <span>{start}</span>
              <span>{end}</span>
            </strong>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="bg-bg-sub flex size-15 items-center justify-center rounded-full">
        {iconMap[type]}
      </div>
      <div className="flex-1 space-y-1">
        <h3 className="text-text-sub text-xs font-medium">{label}</h3>
        <strong className="text-base">{title}</strong>
      </div>
    </div>
  );
}
