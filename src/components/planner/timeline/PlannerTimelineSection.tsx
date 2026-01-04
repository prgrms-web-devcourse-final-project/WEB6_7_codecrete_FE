import { ConcertCoords, PlannerParticipantRole, ScheduleDetail } from "@/types/planner";
import PlannerTimelineItem from "./PlannerTimelineItem";
import StartLocationCard from "./StartLocationCard";
import { getMyLocation } from "@/lib/api/planner/location.server";
import RouteCard from "./RouteCard";

export default async function PlannerTimelineSection({
  planId,
  schedules,
  concertCoords,
  role,
  totalDuration,
}: {
  planId: string;
  schedules: ScheduleDetail[];
  concertCoords: ConcertCoords;
  role: PlannerParticipantRole;
  totalDuration: number;
}) {
  const firstSchedule = schedules[0];

  const isEditable = role === "OWNER" || role === "EDITOR";
  const myLocation = await getMyLocation();

  // 경로 표시 조건: 내 위치(출발지)가 있고, 첫 번째 일정이 있고, 그 일정에 좌표가 있을 때
  const showRoute =
    myLocation && firstSchedule && firstSchedule.locationLat && firstSchedule.locationLon;

  return (
    <>
      {/* 타임라인 헤더 */}
      <div className="space-y-6 lg:space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-text-main text-xl font-bold lg:text-2xl">타임라인</h3>
          <div className="flex items-center gap-2">
            <span className="text-text-sub text-sm">총 소요시간:</span>
            <strong className="text-text-main text-base lg:text-lg">{totalDuration}분</strong>
          </div>
        </div>

        {/* 타임라인 아이템들 */}
        <div className="before:bg-bg-sub relative space-y-6 before:absolute before:top-0 before:left-4 before:h-full before:w-0.5 lg:space-y-8 lg:before:left-8">
          <div className="relative space-y-6 lg:space-y-8">
            <StartLocationCard isEditable={isEditable} myLocation={myLocation} />
            {showRoute && (
              <RouteCard
                start={{
                  lat: myLocation.lat,
                  lon: myLocation.lon,
                  name: myLocation.placeName || "출발지",
                }}
                end={{
                  lat: firstSchedule.locationLat!,
                  lon: firstSchedule.locationLon!,
                  name: firstSchedule.title,
                }}
              />
            )}
            {schedules.map((schedule) => (
              <PlannerTimelineItem
                key={schedule.id}
                schedule={schedule}
                role={role}
                planId={planId}
                concertCoords={{
                  lat: concertCoords.lat,
                  lon: concertCoords.lon,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
