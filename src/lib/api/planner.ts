import { ResponseData } from "@/types/api";
import ServerApi from "@/utils/helpers/serverApi";

interface Planner {
  id: number;
  concertId: number;
  createdBy: number;
  title: string;
  planDate: string;
  createdDate: string;
  modifiedDate: string;
}

// 플래너 계획 생성
export const createPlanner = async ({
  concertId,
  title,
  planDate,
}: {
  concertId: string;
  title: string;
  planDate: string;
}): Promise<ResponseData<Planner>> => {
  try {
    const res = await ServerApi("/api/v1/plans", {
      method: "POST",
      body: JSON.stringify({ concertId, title, planDate }),
    });

    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      throw new Error(`API 요청 실패: ${res.status}`);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error creating planner:", error);
    throw error;
  }
};
