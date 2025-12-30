"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { PlannerListWithDetails } from "@/types/planner";
import { cn } from "@/lib/utils";
import { CalendarDaysIcon, MapPinIcon, SpotlightIcon, Users2Icon } from "lucide-react";
import { formatDateKorean } from "@/utils/helpers/formatters";

export default function PlannerLists({ planLists }: { planLists: PlannerListWithDetails[] }) {
  const router = useRouter();

  // 플래너 모달 상태
  const [plannerDialogOpen, setPlannerDialogOpen] = useState(true);

  // 플래너 닫기 시 콘서트 목록 페이지로 이동
  useEffect(() => {
    if (!plannerDialogOpen) {
      const timer = setTimeout(() => {
        router.push("/concerts");
      }, 300); // 모달 닫기 애니메이션 대기

      return () => clearTimeout(timer);
    }
  }, [plannerDialogOpen, router]);

  return (
    <Dialog
      open={plannerDialogOpen}
      onOpenChange={setPlannerDialogOpen}
      aria-description="플래너 목록 모달"
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>플래너 목록</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] gap-6 space-y-4 overflow-y-auto p-4">
          {planLists.length === 0 && (
            <p className="text-muted-foreground text-center text-sm">생성된 플래너가 없습니다.</p>
          )}
          {planLists.map((plan) => (
            <button
              key={plan.id}
              onClick={() => {
                router.push(`/planner/${plan.id}`);
                setPlannerDialogOpen(false);
              }}
              className={cn(
                "border-input hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:hover:bg-input/50 flex w-full items-start justify-between rounded-md border p-3 text-left"
              )}
            >
              <div className="flex-1">
                <strong className="text-sm font-medium">{plan.title}</strong>
                <ul className="[&>li]:text-muted-foreground mt-2 space-y-1 text-xs [&>li]:flex [&>li]:items-start [&>li]:gap-1">
                  <li>
                    <SpotlightIcon className="mt-0.5 size-3" />
                    {plan.concertDetail.name}
                  </li>
                  <li>
                    <MapPinIcon className="mt-0.5 size-3" />
                    {plan.concertDetail.placeName}
                  </li>
                  <li>
                    <CalendarDaysIcon className="mt-0.5 size-3" />
                    {formatDateKorean(plan.planDate)}
                  </li>
                  <li>
                    <Users2Icon className="mt-0.5 size-3" />
                    {plan.planDetail.participants.length}명 참여
                  </li>
                </ul>
              </div>
            </button>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setPlannerDialogOpen(false)}>
            취소
          </Button>
          <Button onClick={() => router.push("/planner/create")}>새로운 플랜 생성</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
