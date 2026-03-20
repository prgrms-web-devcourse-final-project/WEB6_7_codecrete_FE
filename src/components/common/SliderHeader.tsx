import { SliderHeaderProps } from "@/types/home";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export function SliderHeader({ title, description, onPrev, onNext, className }: SliderHeaderProps) {
  return (
    <div className={cn("flex justify-between gap-4", className)}>
      <div className="space-y-1 md:space-y-2">
        <h2 className="text-text-main text-2xl font-extrabold md:text-3xl">{title}</h2>
        <p className="text-text-sub text-sm font-medium md:text-base">{description}</p>
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
