"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapIcon } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import PlannerSidebarContents from "./PlannerSidebarContents";

export default function MobilePlannerSidebar() {
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
          <SheetContent side="bottom" className="h-[85vh] rounded-t-[20px] px-5 sm:px-6">
            <SheetHeader className="mb-6 text-left">
              <SheetTitle>공연 정보 및 지도</SheetTitle>
            </SheetHeader>
            <div className="h-[calc(100%-80px)] overflow-y-auto pb-10">
              <PlannerSidebarContents />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
