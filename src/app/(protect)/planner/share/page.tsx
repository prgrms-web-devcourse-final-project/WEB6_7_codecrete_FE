import PlannerTimelineSectionSkeleton from "@/components/loading/planner/PlannerTimelineSectionSkeleton";
import PlannerTopActionsSkeleton from "@/components/loading/planner/PlannerTopActionsSkeleton";
import PlannerTopHeaderSkeleton from "@/components/loading/planner/PlannerTopHeaderSkeleton";
import { InviteConfirmDialog } from "@/components/planner/share/InviteConfirmDialog";
import { getSharedPlan } from "@/lib/api/planner/planner.server";
import { notFound } from "next/navigation";

export default async function Page({ searchParams }: { searchParams: Promise<{ code: string }> }) {
  const { code } = await searchParams;

  if (!code || code.trim() === "") {
    notFound();
  }

  // 유효한 액세스 토큰인지 확인
  const sharedPlan = await getSharedPlan(code);
  if (!sharedPlan) {
    notFound();
  }

  return (
    <>
      <PlannerTopHeaderSkeleton />
      <PlannerTopActionsSkeleton />
      <PlannerTimelineSectionSkeleton />
      <InviteConfirmDialog planDetail={sharedPlan} inviteCode={code} />
    </>
  );
}
