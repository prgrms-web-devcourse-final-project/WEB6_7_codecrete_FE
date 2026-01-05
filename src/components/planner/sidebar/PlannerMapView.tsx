import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ScanIcon } from "lucide-react";

export default function PlannerMapView() {
  return (
    <div className="bg-bg-main border-border border p-6">
      <h4 className="text-base font-bold">지도 보기</h4>
      <AspectRatio ratio={1 / 1}>
        <div className="h-full w-full bg-zinc-200"></div>
      </AspectRatio>
      <ul className="space-y-3">
        <li className="flex justify-between">
          <strong className="text-text-main">클럽온에어</strong>
          <span className="text-text-sub">200m</span>
        </li>
        <li className="flex justify-between">
          <strong className="text-text-main">클럽온에어</strong>
          <span className="text-text-sub">200m</span>
        </li>
      </ul>
      <Button className="w-full cursor-pointer">
        <ScanIcon />
        전체 지도 보기
      </Button>
    </div>
  );
}
