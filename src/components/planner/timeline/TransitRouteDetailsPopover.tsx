"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScheduleDetail } from "@/types/planner";
import { BusFrontIcon } from "lucide-react";
import TransitRouteTimeline from "./pending-transport-card/transit/TransitRouteTimeline";

interface TransitRouteDetailsPopoverProps {
  itinerary: NonNullable<ScheduleDetail["transportRoute"]>;
}

export default function TransitRouteDetailsPopover({ itinerary }: TransitRouteDetailsPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="w-full">
          <BusFrontIcon />
          이동 경로 자세히 보기
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <TransitRouteTimeline itinerary={itinerary} />
      </PopoverContent>
    </Popover>
  );
}
