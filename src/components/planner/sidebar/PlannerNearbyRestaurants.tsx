import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";

export default function PlannerNearbyRestaurants() {
  return (
    <div className="bg-bg-main border-border border p-6">
      <h4 className="text-base font-semibold">주변 식당</h4>
      <ul className="space-y-3">
        <li className="bg-bg-sub flex flex-col gap-1 rounded-xl p-4">
          <strong>주변식당 1</strong>
          <span className="text-text-sub text-xs">양식</span>
          <div className="flex justify-between text-xs">
            <span className="flex items-center gap-1 font-semibold text-zinc-600">
              <StarIcon size={12} className="fill-zinc-600" />
              4.5
            </span>
            <span className="text-text-sub">0.5km</span>
          </div>
        </li>
      </ul>
      <Button variant="outline" className="w-full cursor-pointer">
        모든 추천 보기
      </Button>
    </div>
  );
}
