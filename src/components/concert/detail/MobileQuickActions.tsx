"use client";

import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import QuickActionsSection from "./QuickActionsSection";
import { TicketOffice } from "@/types/concerts";
import { User } from "@/types/user";
import { FlashlightIcon } from "lucide-react";

interface MobileQuickActionsProps {
  concertId?: string;
  concertTicketingData?: TicketOffice[] | null;
  concertStartDate?: string;
  concertEndDate?: string;
  userData: User | null;
  isLiked?: boolean;
}

export default function MobileQuickActions({
  concertId,
  concertTicketingData,
  concertStartDate,
  concertEndDate,
  userData,
  isLiked,
}: MobileQuickActionsProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        {!open && (
          <div className="pointer-events-none fixed right-6 bottom-6">
            <div className="pointer-events-auto mx-auto w-full max-w-120">
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="size-12 rounded-full shadow-lg transition-shadow hover:shadow-xl"
                >
                  <FlashlightIcon className="size-5" />
                  <span className="sr-only">빠른 실행</span>
                </Button>
              </SheetTrigger>
            </div>
          </div>
        )}

        <SheetContent
          side="bottom"
          className="z-50 max-h-[85vh] overflow-y-auto pb-[env(safe-area-inset-bottom)] [&>button]:hidden"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>빠른 실행</SheetTitle>
          </SheetHeader>
          <div className="p-4 pt-15 pb-6">
            <SheetClose
              className="bg-bg-sub border-border absolute top-4 left-1/2 h-2 w-40 -translate-x-1/2 rounded-lg border"
              aria-label="빠른 실행창 닫기"
            />
            <QuickActionsSection
              concertId={concertId}
              concertTicketingData={concertTicketingData}
              concertStartDate={concertStartDate}
              concertEndDate={concertEndDate}
              userData={userData}
              isLiked={isLiked}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
