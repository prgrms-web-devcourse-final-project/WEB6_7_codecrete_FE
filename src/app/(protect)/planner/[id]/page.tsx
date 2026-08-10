import { getPlanDetail } from "@/lib/api/planner/planner.server";
import { getUsersMe } from "@/lib/api/user/user.server";
import { getConcertDetail } from "@/lib/api/concerts/concerts.server";
import PlannerError from "@/components/planner/PlannerError";
import { PlannerParticipantRole } from "@/types/planner";
import { headers } from "next/headers";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { plannerQueryKeys } from "@/queries/planner";
import { concertQueryKeys } from "@/queries/concerts";
import PlannerDetail from "@/components/planner/PlannerDetail";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const domain = (await headers()).get("host") || "";

  const [planDetail, me] = await Promise.all([getPlanDetail(id), getUsersMe()]);

  // 접근권한이 없으면 에러 페이지 렌더링됨
  if (!planDetail) {
    return <PlannerError />;
  }

  const participants = planDetail.participants.find((p) => p.userId === me?.id);
  const userRole: PlannerParticipantRole = participants?.role ?? null;

  const concertId = planDetail.concertId?.toString();
  const concertDetail = concertId ? await getConcertDetail({ concertId }) : null;

  const queryClient = new QueryClient();
  queryClient.setQueryData(plannerQueryKeys.detail(id), planDetail);
  if (concertId && concertDetail) {
    queryClient.setQueryData(concertQueryKeys.detail(concertId), concertDetail);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PlannerDetail planId={id} userRole={userRole} domain={domain} />
    </HydrationBoundary>
  );
}
