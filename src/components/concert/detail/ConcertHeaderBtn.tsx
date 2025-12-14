import { CalendarPlus2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function ConcertHeaderBtn() {
  return (
    <div className="button flex w-full gap-4">
      <Link className="w-full" href="#">
        <Button
          variant="default"
          size="lg"
          asChild={false}
          className="bg-point-main w-full flex-1 cursor-pointer"
        >
          <ExternalLink />
          티켓 예매하기
        </Button>
      </Link>
      <Link href="#" className="w-full">
        <Button
          variant="outline"
          size="lg"
          asChild={false}
          className={twMerge(`bg-point-sub border-border-point w-full flex-1 cursor-pointer`)}
        >
          <CalendarPlus2 />
          플래너 만들기
        </Button>
      </Link>
    </div>
  );
}
