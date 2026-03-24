import { getPlanDetail } from "@/lib/api/planner/planner.server";
import { getUsersMe } from "@/lib/api/user/user.server";
import PlannerError from "@/components/planner/PlannerError";
import { PlannerParticipantRole } from "@/types/planner";
import { headers } from "next/headers";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { plannerQueryKeys } from "@/queries/planner";
import PlannerDetail from "@/components/planner/PlannerDetail";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const domain = (await headers()).get("host") || "";

  const [planDetail, me] = await Promise.all([getPlanDetail(id), getUsersMe()]);

  // 접근권한이 없으면 에러 페이지 렌더링됨
  if (!planDetail) {
    return <PlannerError />;
  }

  const myParticipant = planDetail.participants.find((p) => p.userId === me?.id);

  if (!myParticipant) {
    throw new Error("해당 플래너에 접근할 권한이 없습니다.");
  }

  const myRole: PlannerParticipantRole = myParticipant.role ?? null;

  const queryClient = new QueryClient();
  queryClient.setQueryData(plannerQueryKeys.detail(id), planDetail);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PlannerDetail planId={id} role={myRole} domain={domain} />
    </HydrationBoundary>
  );
}
