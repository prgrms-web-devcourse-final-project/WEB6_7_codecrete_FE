import { getPlanDetail } from "@/lib/api/planner/planner.server";
import { getUsersMe } from "@/lib/api/user/user.server";
import PlannerError from "@/components/planner/PlannerError";
import { PlannerParticipantRole } from "@/types/planner";
// import { headers } from "next/headers";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { plannerQueryKeys } from "@/queries/planner";
import PlannerDetail from "@/components/planner/PlannerDetail";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // const domain = (await headers()).get("host") || "";

  // const [planDetail, me, shareData] = await Promise.all([
  //   getPlanDetail(id),
  //   getUsersMe(),
  //   getPlanShareLink(id).catch((error) => ({ error })),
  // ]);
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

  // 공유 링크 조립
  // const shareLink: PlannerShareLink = { domain, url: "", status: "" };

  // if (shareData && !("error" in shareData)) {
  //   const baseUrl = getShareBaseUrl(domain);
  //   shareLink.url = `${baseUrl}/planner/share?code=${shareData.shareToken}`;
  // } else if (shareData && "error" in shareData) {
  //   shareLink.status =
  //     shareData.error instanceof Error
  //       ? shareData.error.message
  //       : "공유 링크를 불러오는 중 오류가 발생했습니다.";
  // }

  // const concertSchedules: ScheduleDetail = planDetail.schedules.find(
  //   (schedule) => schedule.isMainEvent
  // )!;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PlannerDetail planId={id} role={myRole} />
    </HydrationBoundary>
  );
}
