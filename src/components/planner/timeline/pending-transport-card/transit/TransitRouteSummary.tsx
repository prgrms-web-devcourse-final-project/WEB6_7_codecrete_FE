import { Itinerary } from "@/types/planner";
import { formatDuration } from "@/utils/helpers/formatters";
import { Separator } from "@radix-ui/react-separator";
import {
  StarIcon,
  TrainIcon,
  BusFrontIcon,
  PlaneIcon,
  ShipIcon,
  TrainFrontIcon,
  ChevronRightIcon,
} from "lucide-react";
import { Fragment } from "react/jsx-runtime";

interface TransitRouteSummaryProps {
  route: Itinerary;
  index: number;
  isBest: boolean;
  filteredLegs: Itinerary["legs"];
}

export default function TransitRouteSummary({
  route,
  index,
  isBest,
  filteredLegs,
}: TransitRouteSummaryProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-5">
        <div className="flex items-center gap-2">
          <span className="text-foreground text-xl font-bold">
            {formatDuration(route.totalTime)}
          </span>
          {isBest && (
            <span className="text-primary bg-primary/10 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold">
              <StarIcon className="size-3" />
              추천 경로
            </span>
          )}
        </div>
        <div className="text-muted-foreground flex items-center gap-2 text-xs leading-normal">
          {route.totalWalkTime !== undefined && (
            <span>도보 {formatDuration(route.totalWalkTime)}</span>
          )}
          <Separator orientation="vertical" className="h-3!" />
          <span>환승 {route.transferCount}회</span>
          <Separator orientation="vertical" className="h-3!" />
          <span className="text-foreground font-medium">
            {route.fare.regular.totalFare.toLocaleString()}원
          </span>
        </div>
      </div>

      {filteredLegs && filteredLegs.length > 0 && (
        <div className="mt-2 flex flex-wrap items-center gap-1.5 overflow-hidden">
          {filteredLegs.map((leg, i) => {
            const routeColor = leg.routeColor ? `#${leg.routeColor}` : "#9ca3af";
            return (
              <Fragment key={`${index}-${i}`}>
                <div className="text-muted-foreground flex items-center text-[10px]">
                  <span
                    className="flex items-center justify-center gap-0.5 rounded px-1.5 py-0.5 font-bold text-white"
                    style={{ backgroundColor: routeColor }}
                  >
                    {leg.mode === "SUBWAY" && (
                      <>
                        <TrainIcon className="size-3" />
                        {leg.route?.split(":").join(" : ") || leg.mode.split(":").join(" ")}
                      </>
                    )}
                    {leg.mode === "BUS" && (
                      <>
                        <BusFrontIcon className="size-3" />
                        {getBusInitial(leg.route)}
                      </>
                    )}
                    {leg.mode === "AIRPLANE" && (
                      <>
                        <PlaneIcon className="size-3" />
                        {leg.route?.split(":").join(" : ") || leg.mode.split(":").join(" ")}
                      </>
                    )}
                    {leg.mode === "EXPRESSBUS" && (
                      <>
                        <BusFrontIcon className="size-3" />
                        {leg.route?.split(":").join(" : ") || leg.mode.split(":").join(" ")}
                      </>
                    )}
                    {leg.mode === "FERRY" && (
                      <>
                        <ShipIcon className="size-3" />
                        {leg.route?.split(":").join(" : ") || leg.mode.split(":").join(" ")}
                      </>
                    )}
                    {leg.mode === "TRAIN" && (
                      <>
                        <TrainFrontIcon className="size-3" />
                        {leg.route?.split(":").join(" : ") || leg.mode.split(":").join(" ")}
                      </>
                    )}
                  </span>
                </div>
                {i < filteredLegs.length - 1 && (
                  <ChevronRightIcon className="text-muted-foreground size-3" />
                )}
              </Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
}

function getBusInitial(name?: string) {
  if (!name) return <BusFrontIcon className="size-3" />;
  const match = name.match(/(\d+)/);
  if (match) return match[1];
  return name[0];
}
