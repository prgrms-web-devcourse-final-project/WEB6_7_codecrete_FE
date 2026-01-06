"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapIcon } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import PlannerSidebarContents from "./PlannerSidebarContents";
import { PlannerParticipant, ScheduleDetail } from "@/types/planner";

interface MobilePlannerSidebarProps {
  participants: PlannerParticipant[];
  schedules: ScheduleDetail[];
}

export default function MobilePlannerSidebar({
  participants,
  schedules,
}: MobilePlannerSidebarProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  return (
    <>
      {/* === 모바일 플로팅 버튼 & 바텀 시트 === */}
      <div className="fixed right-6 bottom-20 z-50 lg:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="size-12 rounded-full shadow-lg transition-shadow hover:shadow-xl"
            >
              <MapIcon className="size-5" />
              <span className="sr-only">지도 및 정보 보기</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-dvh gap-0">
            <SheetHeader className="border-border border-b sm:px-6">
              <SheetTitle>플래너 지도 및 정보 보기</SheetTitle>
            </SheetHeader>
            <div className="scrollbar-hide h-[calc(100%-80px)] overflow-y-auto p-6">
              <PlannerSidebarContents participants={participants} schedules={schedules} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
