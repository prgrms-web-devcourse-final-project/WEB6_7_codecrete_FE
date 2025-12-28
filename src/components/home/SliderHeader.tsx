import { SliderHeaderProps } from "@/types/home";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

export function SliderHeader({ onPrev, onNext }: SliderHeaderProps) {
  return (
    <div className="mx-auto flex w-full max-w-400 justify-between gap-4">
      <div className="space-y-1 md:space-y-2">
        <h2 className="text-text-main text-2xl font-extrabold md:text-3xl">
          🎫 예매일 임박! 콘서트 모음
        </h2>
        <p className="text-text-sub text-sm font-medium md:text-base">
          티켓팅 광탈하고 울지 말고 미리미리 예매하자구요
        </p>
      </div>
      <div className="hidden gap-4 md:flex">
        <Button
          variant="outline"
          size="icon"
          onClick={onPrev}
          className="size-12 rounded-full"
          aria-label="이전 슬라이드"
        >
          <ChevronLeft className="stroke-border-point size-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onNext}
          className="size-12 rounded-full"
          aria-label="다음 슬라이드"
        >
          <ChevronRight className="stroke-border-point size-6" />
        </Button>
      </div>
    </div>
  );
}
