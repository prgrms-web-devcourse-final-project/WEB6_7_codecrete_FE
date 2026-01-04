"use client";
import { Itinerary } from "@/types/planner";
import { BusFrontIcon, TrainIcon, ChevronRightIcon } from "lucide-react";
import TransitRouteTimeline from "./TransitRouteTimeline";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

interface TransitRouteListProps {
  itineraries: Itinerary[];
  onSelect: (route: Itinerary | null) => void;
}

export default function TransitRouteList({ itineraries, onSelect }: TransitRouteListProps) {
  const bestRoute = findBestRoute(itineraries);

  if (!bestRoute) {
    return (
      <div className="text-muted-foreground py-4 text-center text-sm">추천 경로가 없습니다.</div>
    );
  }

  const { totalTime, fare, legs, totalWalkTime, transferCount } = bestRoute;
  const filteredLegs = legs?.filter((leg) => leg.mode !== "WALK") || [];

  return (
    <Accordion
      type="single"
      collapsible
      className="border-input w-full rounded-md border shadow-xs"
    >
      <AccordionItem value="bestRoute">
        <AccordionTrigger
          className="w-full px-3 py-2 hover:no-underline"
          onClick={() => onSelect(bestRoute)}
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-2">
              <span className="text-foreground text-xl font-bold">
                {Math.round(totalTime / 60)}분
              </span>
            </div>
            <div className="text-muted-foreground flex items-center gap-2 text-xs">
              <span>도보 {Math.round(totalWalkTime / 60)}분</span>
              <Separator orientation="vertical" className="h-2!" />
              <span>환승 {transferCount}회</span>
              <Separator orientation="vertical" className="h-2!" />
              <span className="text-foreground font-medium">
                {fare.regular.totalFare.toLocaleString()}원
              </span>
            </div>

            {/* 접혀있을 때만 보이는 간략 경로 프리뷰 */}
            {filteredLegs.length > 0 && (
              <div className="mt-2 flex items-center gap-1.5 overflow-hidden">
                {filteredLegs.map((leg, i) => {
                  const routeColor = leg.routeColor ? `#${leg.routeColor}` : "#9ca3af";
                  return (
                    <>
                      <div
                        key={`${leg.start}-${leg.end}`}
                        className="text-muted-foreground flex items-center text-[10px]"
                      >
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
                    </>
                  );
                })}
              </div>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <TransitRouteTimeline itinerary={bestRoute} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function getBusInitial(name?: string) {
  if (!name) return <BusFrontIcon className="size-3" />;
  const match = name.match(/(\d+)/);
  if (match) return match[1];
  return name[0];
}

function findBestRoute(itineraries: Itinerary[]): Itinerary | null {
  if (!itineraries || itineraries.length === 0) return null;

  // 가중치 설정 (입맛에 맞게 조절 가능)
  // 예: 환승 1회는 약 5분의 시간 손해와 같다고 가정
  const TRANSFER_PENALTY_SECONDS = 5 * 60;

  let bestRoute: Itinerary | null = null;
  let minScore = Infinity;

  itineraries.forEach((route) => {
    // 점수 계산: 총 시간(초) + (환승 횟수 * 패널티)
    const score = route.totalTime + route.transferCount * TRANSFER_PENALTY_SECONDS;

    // 디버깅용 로그 (개발 단계 확인용)
    // console.log(`시간: ${route.totalTime/60}분, 환승: ${route.transferCount}회, 점수: ${score}`);

    if (score < minScore) {
      minScore = score;
      bestRoute = route;
    }
  });

  return bestRoute;
}
