"use client";
import { Fragment } from "react";
import { Itinerary } from "@/types/planner";
import { BusFrontIcon, TrainIcon, ChevronRightIcon, StarIcon, CheckIcon } from "lucide-react";
import TransitRouteTimeline from "./TransitRouteTimeline";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface TransitRouteListProps {
  itineraries: Itinerary[];
  onSelect: (route: Itinerary | null, index: number | null) => void;
  selectedIndex?: number | null;
}

export default function TransitRouteList({
  itineraries,
  onSelect,
  selectedIndex,
}: TransitRouteListProps) {
  if (!itineraries || itineraries.length === 0) {
    return (
      <div className="text-muted-foreground py-4 text-center text-sm">추천 경로가 없습니다.</div>
    );
  }

  const bestIndex = findBestRouteIndex(itineraries);
  const routesWithMeta = itineraries.map((route, index) => ({
    route,
    index,
    isBest: index === bestIndex,
  }));

  const sortedRoutes =
    bestIndex !== null
      ? [routesWithMeta[bestIndex], ...routesWithMeta.filter((_, idx) => idx !== bestIndex)]
      : routesWithMeta;

  return (
    <Accordion type="single" collapsible className="w-full space-y-2">
      {sortedRoutes.map(({ route, index, isBest }) => {
        const filteredLegs = route.legs?.filter((leg) => leg.mode !== "WALK") || [];
        const isSelected = selectedIndex === index;

        return (
          <AccordionItem
            key={`route-${index}`}
            value={`route-${index}`}
            className={cn(
              "border-input rounded-md border border-b! shadow-xs transition",
              isSelected && "ring-primary/60 ring-2"
            )}
          >
            <AccordionTrigger
              className="w-full px-3 py-2 hover:no-underline"
              onClick={() => onSelect(route, index)}
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-foreground text-xl font-bold">
                    {Math.round(route.totalTime / 60)}분
                  </span>
                  {isBest && (
                    <span className="text-primary bg-primary/10 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold">
                      <StarIcon className="size-3" />
                      추천 경로
                    </span>
                  )}
                  {isSelected && (
                    <span className="text-primary bg-primary/10 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold">
                      <CheckIcon className="size-3" /> 선택됨
                    </span>
                  )}
                </div>
                <div className="text-muted-foreground flex items-center gap-2 text-xs">
                  {route.totalWalkTime !== undefined && (
                    <span>도보 {Math.round(route.totalWalkTime / 60)}분</span>
                  )}
                  <Separator orientation="vertical" className="h-2" />
                  <span>환승 {route.transferCount}회</span>
                  <Separator orientation="vertical" className="h-2" />
                  <span className="text-foreground font-medium">
                    {route.fare.regular.totalFare.toLocaleString()}원
                  </span>
                </div>

                {filteredLegs.length > 0 && (
                  <div className="mt-2 flex items-center gap-1.5 overflow-hidden">
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
                                  {leg.route}
                                </>
                              )}
                              {leg.mode === "BUS" && (
                                <>
                                  <BusFrontIcon className="size-3" />
                                  {getBusInitial(leg.route)}
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
            </AccordionTrigger>
            <AccordionContent>
              <TransitRouteTimeline itinerary={route} />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

function getBusInitial(name?: string) {
  if (!name) return <BusFrontIcon className="size-3" />;
  const match = name.match(/(\d+)/);
  if (match) return match[1];
  return name[0];
}

function findBestRouteIndex(itineraries: Itinerary[]): number | null {
  if (!itineraries || itineraries.length === 0) return null;

  const TRANSFER_PENALTY_SECONDS = 5 * 60;

  let bestIndex: number | null = null;
  let minScore = Infinity;

  itineraries.forEach((route, index) => {
    const score = route.totalTime + route.transferCount * TRANSFER_PENALTY_SECONDS;
    if (score < minScore) {
      minScore = score;
      bestIndex = index;
    }
  });

  return bestIndex;
}
