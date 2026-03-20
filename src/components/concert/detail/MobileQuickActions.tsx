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
import { ConcertDetail, TicketOffice } from "@/types/concerts";
import { FlashlightIcon } from "lucide-react";
import { useIsDesktop } from "@/hooks/useDesktop";

interface MobileQuickActionsProps {
  concertDetail: ConcertDetail;
  concertTicketing: TicketOffice[] | null;
  isLiked?: boolean;
  isAuthenticated: boolean;
  isChatAvailable: boolean;
}

export default function MobileQuickActions({
  concertDetail,
  concertTicketing,
  isLiked,
  isAuthenticated,
  isChatAvailable,
}: MobileQuickActionsProps) {
  const isDesktop = useIsDesktop();
  const [open, setOpen] = useState(false);

  if (isDesktop) return null;

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        {!open && (
          <div className="pointer-events-none fixed right-6 bottom-6 z-50">
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
              className="bg-muted absolute top-4 left-1/2 h-1.5 w-12 -translate-x-1/2 rounded-lg"
              aria-label="빠른 실행창 닫기"
            />
            <QuickActionsSection
              concertDetail={concertDetail}
              concertTicketing={concertTicketing}
              isLiked={isLiked}
              isAuthenticated={isAuthenticated}
              isChatAvailable={isChatAvailable}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
