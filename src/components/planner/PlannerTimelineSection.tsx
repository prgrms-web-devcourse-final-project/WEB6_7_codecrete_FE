"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapIcon } from "lucide-react";
import PlannerQuickTips from "./PlannerQuickTips";
import PlannerTimelineItem from "./PlannerTimelineItem";
import PlannerMapView from "./PlannerMapView";
import PlannerInviteFriends from "./PlannerInviteFriends";
import PlannerNearbyRestaurants from "./PlannerNearbyRestaurants";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { mockSchedules } from "@/data/schedule";

// 사이드바 내용을 재사용하기 위해 컴포넌트로 분리
function SidebarContent() {
  return (
    <div className="flex flex-col space-y-6 *:space-y-4 *:rounded-2xl">
      <PlannerMapView />
      <PlannerInviteFriends />
      <PlannerNearbyRestaurants />
    </div>
  );
}

export default function PlannerTimelineSection() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <section className="bg-bg-sub px-5 py-8 lg:px-15 lg:py-10">
      <div className="mx-auto flex w-full max-w-400 gap-8">
        {/* === 메인 타임라인 영역 (모바일/데스크톱 모두 보임) === */}
        <div className="*:bg-bg-main *:border-border w-full flex-1 space-y-6 *:rounded-2xl *:border *:p-5 lg:flex-3 lg:space-y-8 lg:*:p-8">
          {/* 타임라인 헤더 */}
          <div className="space-y-6 lg:space-y-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-text-main text-xl font-bold lg:text-2xl">타임라인</h3>
              <div className="flex items-center gap-2">
                <span className="text-text-sub text-sm">총 소요시간:</span>
                <strong className="text-text-main text-base lg:text-lg">6시간</strong>
              </div>
            </div>

            {/* 타임라인 아이템들 */}
            <div className="before:bg-bg-sub relative space-y-6 before:absolute before:top-0 before:left-4 before:h-full before:w-0.5 lg:space-y-8 lg:before:left-8">
              <div className="relative space-y-6 lg:space-y-8">
                {mockSchedules.map((schedule, idx) => (
                  <PlannerTimelineItem
                    key={schedule.schedule_id}
                    schedule={schedule}
                    onLast={mockSchedules.length === idx + 1}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 꿀팁 섹션 */}
          <PlannerQuickTips />
        </div>

        {/* === 데스크톱 사이드바 === */}
        <div className="hidden lg:block lg:max-w-125 lg:flex-1">
          <div className="sticky top-30 space-y-8">
            <SidebarContent />
          </div>
        </div>
      </div>

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
          <SheetContent side="bottom" className="h-[85vh] rounded-t-[20px] px-5 sm:px-6">
            <SheetHeader className="mb-6 text-left">
              <SheetTitle>공연 정보 및 지도</SheetTitle>
            </SheetHeader>
            <div className="h-[calc(100%-80px)] overflow-y-auto pb-10">
              <SidebarContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
}
