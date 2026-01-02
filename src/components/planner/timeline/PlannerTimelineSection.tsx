import { PlanDetail } from "@/types/planner";
import PlannerTimelineItem from "./PlannerTimelineItem";
import StartLocationCard from "./StartLocationCard";
import { getMyLocation } from "@/lib/api/planner/location.server";

export default async function PlannerTimelineSection({
  planDetail,
  role,
}: {
  planDetail: PlanDetail;
  role: string;
}) {
  const isEditable = role === "OWNER" || role === "EDITOR";
  const myLocation = await getMyLocation();

  return (
    <>
      {/* 타임라인 헤더 */}
      <div className="space-y-6 lg:space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-text-main text-xl font-bold lg:text-2xl">타임라인</h3>
          <div className="flex items-center gap-2">
            <span className="text-text-sub text-sm">총 소요시간:</span>
            <strong className="text-text-main text-base lg:text-lg">
              {planDetail.totalDuration}분
            </strong>
          </div>
        </div>

        {/* 타임라인 아이템들 */}
        <div className="before:bg-bg-sub relative space-y-6 before:absolute before:top-0 before:left-4 before:h-full before:w-0.5 lg:space-y-8 lg:before:left-8">
          <div className="relative space-y-6 lg:space-y-8">
            <StartLocationCard
              planId={planDetail.id}
              isEditable={isEditable}
              myLocation={myLocation}
            />
            {planDetail.schedules.map((schedule) => (
              <PlannerTimelineItem
                key={schedule.id}
                schedule={schedule}
                role={role}
                planId={planDetail.id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
