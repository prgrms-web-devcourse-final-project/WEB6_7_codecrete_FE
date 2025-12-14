import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";

export default function ConcertHeaderTitle() {
  return (
    <div className="title flex justify-between">
      <div className="flex flex-col gap-4">
        <div>
          <Badge className={twMerge(`bg-point-main text-text-point-main mr-2 text-sm`)}>Rock</Badge>
          <Badge className="bg-border text-text-main mr-2 text-sm">Live Performance</Badge>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-text-main text-4xl font-bold">2025 Christmas Concert</h2>
          <p className="text-text-sub text-xl">World Tour 2025 - North America Leg</p>
        </div>
      </div>
      <Button variant="outline" size="icon" className="border-border hover:bg-border">
        <Heart />
      </Button>
    </div>
  );
}
