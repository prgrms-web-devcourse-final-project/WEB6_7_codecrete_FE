"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";
import { plannerQueries } from "@/queries/planner";
import PlannerListItem from "./PlannerListItem";
import { useQuery } from "@tanstack/react-query";
import PlannerListSkeleton from "./PlannerListSkeleton";
import { FeatherIcon } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function PlannerList() {
  const router = useRouter();

  // 플래너 모달 상태
  const [plannerDialogOpen, setPlannerDialogOpen] = useState(true);

  const { data: planLists = [], isLoading } = useQuery(plannerQueries.list());

  const handleCloseToHome = () => {
    setPlannerDialogOpen(false);
    router.push("/home");
  };

  return (
    <Dialog
      open={plannerDialogOpen}
      onOpenChange={setPlannerDialogOpen}
      aria-description="플래너 목록 모달"
    >
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>플래너 목록</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] gap-6 space-y-4 overflow-y-auto p-4">
          {isLoading ? (
            <PlannerListSkeleton />
          ) : (
            <>
              {planLists.length === 0 && (
                <Empty>
                  <EmptyContent>
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <FeatherIcon />
                      </EmptyMedia>
                      <EmptyTitle>참여중인 플랜이 없어요.</EmptyTitle>
                    </EmptyHeader>
                    <EmptyDescription className="break-keep">
                      플랜을 만들고 친구들과 공유하여 콘서트 경험을 더욱 특별하게 만들어보세요.
                    </EmptyDescription>
                  </EmptyContent>
                </Empty>
              )}
              {planLists.map((plan) => (
                <PlannerListItem key={plan.id} plan={plan} />
              ))}
            </>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCloseToHome}>
            취소
          </Button>
          <Button onClick={() => router.push("/planner/create")}>새로운 플랜 생성</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
