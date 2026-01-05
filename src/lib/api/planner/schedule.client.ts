import { ResponseData } from "@/types/api";
import { ScheduleDetail } from "@/types/planner";
import ClientApi from "@/utils/helpers/clientApi";

/**
 * planId 값을 가진 플래너에 새로운 스케줄을 생성합니다.
 *
 * @param {string} planId - 플래너 ID
 * @param {ScheduleDetail} scheduleData - 생성할 스케줄 데이터
 * @returns {Promise<ResponseData<ScheduleDetail>>} 생성된 스케줄 데이터
 */
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
      const errorData = await res.json();
      console.error("API Error:", res.status, res.statusText, errorData);
      throw new Error(errorData.msg || `API 요청 실패: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating planner schedule:", error);
    throw error;
  }
};

/**
 * planId와 scheduleId 값을 가진 플래너 스케줄을 수정합니다.
 * @param {string} planId - 플래너 ID
 * @param {string} scheduleId - 스케줄 ID
 * @param {ScheduleDetail} updatedData - 수정할 스케줄 데이터
 * @returns {Promise<ResponseData<ScheduleDetail>>} 수정된 스케줄 데이터
 */
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

/**
 * planId와 scheduleId 값을 가진 플래너 스케줄을 삭제합니다.
 * @param {string} planId - 플래너 ID
 * @param {string} scheduleId - 스케줄 ID
 * @returns {Promise<boolean>} 삭제 성공 여부
 */
export const deletePlanSchedule = async ({
  planId,
  scheduleId,
}: {
  planId: string;
  scheduleId: number;
}) => {
  try {
    const res = await ClientApi(`/api/v1/plans/${planId}/schedules/${scheduleId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      throw new Error(`API 요청 실패: ${res.status}`);
    }
  } catch (error) {
    console.error("Error deleting planner schedule:", error);
    throw error;
  }
};
