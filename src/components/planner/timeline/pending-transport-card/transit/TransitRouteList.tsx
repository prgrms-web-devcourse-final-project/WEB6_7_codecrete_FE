"use client";
import { Itinerary } from "@/types/planner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import TransitRouteTimeline from "./TransitRouteTimeline";
import TransitRouteSummary from "./TransitRouteSummary";

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
      {sortedRoutes.map(({ route, index }) => {
        const filteredLegs = route.legs?.filter((leg) => leg.mode !== "WALK") || [];
        const isSelected = selectedIndex === index;

        return (
          <AccordionItem
            key={`route-${index}`}
            value={`route-${index}`}
            className={cn(
              "bg-muted rounded-md border-0 opacity-60 shadow-none",
              isSelected && "ring-input bg-main opacity-100 ring-1"
            )}
          >
            <AccordionTrigger
              className="w-full p-3 hover:no-underline lg:p-4"
              onClick={() => onSelect(route, index)}
            >
              <TransitRouteSummary
                route={route}
                index={index}
                isBest={index === bestIndex}
                filteredLegs={filteredLegs}
              />
            </AccordionTrigger>
            <AccordionContent className="p-0">
              <TransitRouteTimeline itinerary={route} />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
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
