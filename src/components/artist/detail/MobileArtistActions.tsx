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
import QuickStat from "./QuickStat";
import HotTrack from "./HotTrack";
import SimilarArtists from "./SimilarArtists";
import { ArtistDetail } from "@/types/artists";
import { FlashlightIcon } from "lucide-react";

interface MobileArtistActionsProps {
  artist: ArtistDetail;
}

export default function MobileArtistActions({ artist }: MobileArtistActionsProps) {
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
                  <span className="sr-only">아티스트 정보 더보기</span>
                </Button>
              </SheetTrigger>
            </div>
          </div>
        )}

        <SheetContent
          side="bottom"
          className="z-50 max-h-[85vh] overflow-y-auto pb-[env(safe-area-inset-bottom)] [&>button]:hidden"
        >
          {/* 드래그 핸들 */}
          <SheetHeader className="sr-only">
            <SheetTitle>아티스트 정보</SheetTitle>
          </SheetHeader>
          <div className="space-y-6 p-4 pt-15 pb-6">
            <SheetClose
              className="bg-muted absolute top-4 left-1/2 h-1.5 w-12 -translate-x-1/2 rounded-lg"
              aria-label="아티스트 정보창 닫기"
            />
            <QuickStat artist={artist} />
            <HotTrack tracks={artist.topTracks} />
            <SimilarArtists relatedArtists={artist.relatedArtists} />
          </div>
        </SheetContent>
      </Sheet>
      {/* 내용이 버튼과 겹치지 않도록 하단 패딩 (safe-area 반영) */}
      <div className="h-[calc(5rem+env(safe-area-inset-bottom))]" />
    </div>
  );
}
