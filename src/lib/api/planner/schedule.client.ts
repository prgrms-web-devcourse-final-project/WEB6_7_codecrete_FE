import { ResponseData } from "@/types/api";
import { ScheduleDetail } from "@/types/planner";
import ClientApi from "@/utils/helpers/clientApi";

// 플래너 스케줄 생성
export const createPlanSchedule = async ({
  planId,
  scheduleData,
}: {
  planId: string;
  scheduleData: ScheduleDetail;
}): Promise<ResponseData<ScheduleDetail>> => {
  try {
    const res = await ClientApi(`/api/v1/plans/${planId}/schedules`, {
      method: "POST",
      body: JSON.stringify(scheduleData),
    });
    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      throw new Error(`API 요청 실패: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating planner schedule:", error);
    throw error;
  }
};

// 플래너 스케줄 수정
export const updatePlanSchedule = async ({
  planId,
  scheduleId,
  updatedData,
}: {
  planId: string;
  scheduleId: string;
  updatedData: ScheduleDetail;
}) => {
  try {
    const res = await ClientApi(`/api/v1/plans/${planId}/schedules/${scheduleId}`, {
      method: "PATCH",
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      throw new Error(`API 요청 실패: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error updating planner schedule:", error);
    throw error;
  }
};
