import { getSharedPlan, joinPlanAsParticipant } from "@/lib/api/planner/planner.server";
import { notFound, redirect } from "next/navigation";

export default async function Page({ searchParams }: { searchParams: Promise<{ code: string }> }) {
  const { code } = await searchParams;

  // 유효한 액세스 토큰인지 확인
  const sharedPlanDetail = await getSharedPlan(code);
  if (!sharedPlanDetail) {
    notFound();
  }

  // 참가자로 넣기
  const acceptResult = await joinPlanAsParticipant(code);
  if (!acceptResult) {
    notFound();
  }

  // 성공적으로 됐으면 이동
  redirect(`/planner/${sharedPlanDetail.id}`);
}
