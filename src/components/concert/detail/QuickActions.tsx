import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/button";
import { QuickActionsProps } from "@/components/concert/ConcertType";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function QuickActions({ Icon1, text, Icon2 = ArrowRight }: QuickActionsProps) {
  return (
    <Link href="#">
      <Button
        className={twMerge(
          `bg-point-sub border-border w-full cursor-pointer items-center justify-between`
        )}
        variant="outline"
        size="lg"
        asChild={false}
      >
        <div className="flex items-center gap-2">
          <Icon1 />
          {text}
        </div>
        <Icon2 className="text-text-sub" />
      </Button>
    </Link>
  );
}
