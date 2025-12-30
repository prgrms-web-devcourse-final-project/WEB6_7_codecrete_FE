import BackPageButton from "@/components/common/BackPageButton";
import { getConcertDetail } from "@/lib/api/concerts/concerts.server";
import { getPlanDetail } from "@/lib/api/planner/planner.server";
import { getUsersMe } from "@/lib/api/user/user.server";
import { formatDateKorean } from "@/utils/helpers/formatters";
import { ArrowLeftIcon, Calendar1Icon, MapPinIcon } from "lucide-react";
import PlannerEdit from "./PlannerEdit";

export default async function PlannerTopHeader({ planId }: { planId: string }) {
  let planDetail;
  try {
    planDetail = await getPlanDetail(planId);
  } catch (error) {
    throw error;
  }

  if (!planDetail) {
    const error = new Error("해당 플랜을 불러올 수 없습니다.");
    (error as Error & { statusCode?: number }).statusCode = 404;
    throw error;
  }

  // 플랜에 참여자로 등록되어 있지 않을 경우
  const me = await getUsersMe();
  let myRole = "";
  if (!planDetail.participants.find((participant) => participant.userId === me.id)) {
    const error = new Error("해당 플래너에 접근할 권한이 없습니다.");
    (error as Error & { statusCode?: number }).statusCode = 403;
    throw error;
  } else {
    myRole =
      planDetail.participants.find((participant) => participant.userId === me.id)?.role || "";
  }

  const concertId = planDetail.concertId.toString();
  const concertDetail = await getConcertDetail({ concertId });

  return (
    <header
      className="relative overflow-hidden px-5 py-10 lg:px-15 lg:py-20"
      style={{
        backgroundImage: `url(${concertDetail?.posterUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 배경 오버레이용 */}
      <div className="from-bg-main opacity/95 absolute inset-0 bg-linear-to-r to-transparent backdrop-blur-lg" />
      <div className="relative mx-auto max-w-400 space-y-4 lg:space-y-6">
        {/* 뒤로 가기 버튼 */}
        <div className="flex justify-between gap-5">
          <BackPageButton
            variant="ghost"
            className="flex items-center gap-2 text-sm text-zinc-400 hover:bg-transparent hover:text-zinc-200 lg:text-base"
          >
            <ArrowLeftIcon size={16} />
            뒤로 가기
          </BackPageButton>
          {myRole === "OWNER" && (
            <PlannerEdit planDetail={planDetail} concertDetail={concertDetail!} />
          )}
        </div>

        {/* 타이틀 영역 */}
        <div className="space-y-2 lg:space-y-3">
          <h2 className="text-text-main text-2xl font-bold lg:text-4xl">{planDetail.title}</h2>
          <p className="text-text-sub text-sm lg:text-xl">{concertDetail?.name}</p>
        </div>

        {/* 기타 정보 */}
        <ul className="text-text-sub flex flex-col gap-1 font-medium *:flex *:gap-1 lg:*:gap-2">
          <li className="text-xs lg:text-base">
            <MapPinIcon className="mt-0.5 size-3 lg:mt-1 lg:size-4" />
            <p className="flex flex-wrap gap-x-1 gap-y-0.5 lg:gap-x-2">
              <span>{concertDetail?.placeAddress}</span>
              <span>{concertDetail?.placeName}</span>
            </p>
          </li>
          <li className="text-xs lg:text-base">
            <Calendar1Icon className="mt-0.5 size-3 lg:mt-1 lg:size-4" />
            <span>{formatDateKorean(planDetail.planDate)}</span>
          </li>
        </ul>
      </div>
    </header>
  );
}
