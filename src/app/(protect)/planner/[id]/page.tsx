import PlannerInviteFriends from "@/components/planner/PlannerInviteFriends";
import PlannerMapView from "@/components/planner/PlannerMapView";
import PlannerNearbyRestaurants from "@/components/planner/PlannerNearbyRestaurants";
import PlannerTopActions from "@/components/planner/PlannerTopActions";
import PlannerTopHeader from "@/components/planner/PlannerTopHeader";
import PlannerQuickTips from "@/components/planner/PlannerQuickTips";
import PlannerTimelineItem from "@/components/planner/PlannerTimelineItem";
import { ScheduleProps } from "@/types/planner";

export default function Page() {
  const mockSchedules: ScheduleProps[] = [
    {
      schedule_id: 1,
      plan_id: 101,
      schedule_type: "ACTIVITY",
      title: "하루의 시작",
      start_at: "2025-12-14T15:00:00", // 오후 3:00
      duration: 30, // 임의 설정
      location: "숙소",
      location_lat: 37.5665,
      location_lon: 126.978,
      estimated_cost: 0,
      details: "콘서트 경험을 충분히 즐기고 주변을 탐색할 시간을 확보하세요",
      sequence_order: 1,
      created_date: "2025-12-14T09:00:00",
      modified_date: "2025-12-14T09:00:00",
    },
    {
      schedule_id: 2,
      plan_id: 101,
      schedule_type: "TRANSPORT",
      title: "지하철 이동",
      start_at: "2025-12-14T15:30:00", // 오후 3:30
      duration: 25, // "25분"
      location: "이동 경로: 라인 2 → 라인 9",
      location_lat: 37.5665,
      location_lon: 126.978,
      estimated_cost: 3000, // "$2.75" -> 약 3000원 환산
      details: "식당에서 공연장으로 이동. 이동 경로: 라인 2 → 라인 9",
      sequence_order: 2,
      transport_type: "PUBLIC_TRANSPORT",
      created_date: "2025-12-14T09:00:00",
      modified_date: "2025-12-14T09:00:00",
    },
    {
      schedule_id: 3,
      plan_id: 101,
      schedule_type: "MEAL",
      title: "벨라비스타에서 저녁 식사",
      start_at: "2025-12-14T18:00:00", // 오후 6:00
      duration: 90,
      location: "벨라비스타 (Bella Vista)",
      location_lat: 37.57,
      location_lon: 126.98,
      estimated_cost: 50000,
      details: "이탈리안 레스토랑 - 고급 식사 경험. ★ 4.8 (2.4K 리뷰) [추천]",
      sequence_order: 3,
      distance: 500, // "0.5km" -> 500m
      created_date: "2025-12-14T09:00:00",
      modified_date: "2025-12-14T09:00:00",
    },
    {
      schedule_id: 4,
      plan_id: 101,
      schedule_type: "TRANSPORT",
      title: "드라이브 & 주차",
      start_at: "2025-12-14T19:30:00", // 오후 7:30
      duration: 40, // "30-40분" -> 최대값
      location: "공연장 주차장",
      location_lat: 37.5123,
      location_lon: 127.0589,
      estimated_cost: 5000, // "$4.50"
      details: "공연장 주차장에 도착하세요. 문이 열리기 전에 충분한 시간이 있어요.",
      sequence_order: 4,
      transport_type: "CAR",
      created_date: "2025-12-14T09:00:00",
      modified_date: "2025-12-14T09:00:00",
    },
    {
      schedule_id: 5,
      plan_id: 101,
      schedule_type: "CONCERT",
      title: "콘서트: 더 미드나잇 에코",
      start_at: "2025-12-14T20:00:00", // 오후 8:00
      duration: 180, // "3시간" -> 180분
      location: "올림픽 체조경기장", // 가상의 장소
      location_lat: 37.52,
      location_lon: 127.1,
      estimated_cost: 150000,
      details: "[메인 이벤트] 개장 시간: 오후 7:30. 셋리스트 확인 가능.",
      sequence_order: 5,
      created_date: "2025-12-14T09:00:00",
      modified_date: "2025-12-14T09:00:00",
    },
    {
      schedule_id: 6,
      plan_id: 101,
      schedule_type: "TRANSPORT",
      title: "산책",
      start_at: "2025-12-14T19:45:00", // 오후 7:45 (순서상 미세 조정 필요할 수 있음)
      duration: 15,
      location: "공연장 입구",
      location_lat: 37.5205,
      location_lon: 127.1005,
      estimated_cost: 0,
      details: "주차장에서 공연장 입구까지의 짧은 산책",
      sequence_order: 6,
      transport_type: "WALK",
      created_date: "2025-12-14T09:00:00",
      modified_date: "2025-12-14T09:00:00",
    },
    {
      schedule_id: 7,
      plan_id: 101,
      schedule_type: "ACTIVITY",
      title: "공연 후 뒤풀이",
      start_at: "2025-12-15T00:00:00", // 자정
      duration: 120,
      location: "근처 바",
      location_lat: 37.521,
      location_lon: 127.101,
      estimated_cost: 30000,
      details: "친구들과 함께 여유를 즐기세요 (선택 일정)",
      sequence_order: 7,
      created_date: "2025-12-14T09:00:00",
      modified_date: "2025-12-14T09:00:00",
    },
    {
      schedule_id: 8,
      plan_id: 101,
      schedule_type: "TRANSPORT",
      title: "택시 이동",
      start_at: "2025-12-15T05:30:00", // 오전 5:30
      duration: 20, // "20분"
      location: "레스토랑 앞",
      location_lat: 37.53,
      location_lon: 127.08,
      estimated_cost: 35000, // "$25-35" -> 최대값 적용
      details: "현위치에서 레스토랑으로 빠른 이동",
      sequence_order: 8,
      transport_type: "CAR",
      created_date: "2025-12-14T09:00:00",
      modified_date: "2025-12-14T09:00:00",
    },
    {
      schedule_id: 9,
      plan_id: 101,
      schedule_type: "ACTIVITY",
      title: "하루의 마무리",
      start_at: "2025-12-15T06:00:00", // 오전 6시로 가정 (자정 12:00이 문맥상 다음날 새벽)
      duration: 0,
      location: "집",
      location_lat: 37.5,
      location_lon: 127.0,
      estimated_cost: 0,
      details: "집으로 안전하게 이동하세요. 경험을 공유하는 것을 잊지 마세요.",
      sequence_order: 9,
      created_date: "2025-12-14T09:00:00",
      modified_date: "2025-12-14T09:00:00",
    },
  ];

  return (
    <>
      <PlannerTopHeader />
      <PlannerTopActions />
      <section className="bg-bg-sub px-15 py-10">
        <div className="mx-auto flex w-full max-w-400 gap-8">
          <div className="*:bg-bg-main *:border-border flex-3 space-y-8 *:rounded-2xl *:border *:p-8">
            <div className="space-y-8">
              <div className="flex justify-between">
                <h3 className="text-text-main text-2xl font-bold">타임라인</h3>
                <div className="flex items-center gap-2">
                  <span className="text-text-sub text-sm">총 소요시간:</span>
                  <strong className="text-text-main text-lg">6시간</strong>
                </div>
              </div>
              <div className="before:bg-bg-sub relative space-y-8 before:absolute before:top-0 before:left-8 before:h-full before:w-0.5">
                <div className="relative space-y-8">
                  {mockSchedules.map((schedule, idx) => (
                    <PlannerTimelineItem
                      key={schedule.schedule_id}
                      schedule={schedule}
                      onLast={mockSchedules.length === idx + 1}
                    />
                  ))}
                </div>
              </div>
            </div>
            <PlannerQuickTips />
          </div>

          <div className="max-w-125 flex-1">
            <div className="sticky top-30 flex flex-col space-y-8 *:space-y-4 *:rounded-2xl">
              <PlannerMapView />
              <PlannerInviteFriends />
              <PlannerNearbyRestaurants />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
