import { PlanDetail, PlannerListWithDetails } from "@/types/planner";
import ServerApi from "@/utils/helpers/serverApi";
import { getConcertDetail } from "../concerts/concerts.server";
import { notFound } from "next/navigation";

// 플래너 계획 상세 조회
export const getPlanDetail = async (planId: string): Promise<PlanDetail | null> => {
  try {
    const res = await ServerApi(`/api/v1/plans/${planId}`, { method: "GET" });

    if (!res.ok) {
      if (res.status === 404) {
        notFound();
      }

      if (res.status === 403) {
        throw new Error("FORBIDDEN");
      }

      const message = "플랜 정보를 불러오는데 실패했습니다.";

      const error = new Error(message);
      (error as Error & { statusCode?: number }).statusCode = res.status;
      throw error;
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching plan details:", error);
    throw error;
  }
};

// 플래너 계획 목록 조회
export const getPlanList = async (): Promise<PlannerListWithDetails[]> => {
  try {
    const res = await ServerApi("/api/v1/plans/list", { method: "GET" });
    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      throw new Error(`API 요청 실패: ${res.status}`);
    }
    const data = await res.json();

    const planListWithConcertDetails = await Promise.all(
      data.data.map(async (plan: PlanDetail) => {
        try {
          const concertDetail = await getConcertDetail({ concertId: plan.concertId.toString() });
          const planDetail = await getPlanDetail(plan.id.toString());

          return {
            ...plan,
            concertDetail,
            planDetail,
          };
        } catch (error) {
          console.error(`Error fetching ticket info for concert ${plan.id}:`, error);
          return plan;
        }
      })
    );

    return planListWithConcertDetails;
  } catch (error) {
    console.error("Error fetching plans list:", error);
    throw error;
  }
};

// 플래너 공유 링크 조회
export const getPlanShareLink = async (
  planId: string
): Promise<{ planId: string; shareToken: string; shareLink: string }> => {
  try {
    const res = await ServerApi(`/api/v1/plans/${planId}/share/link`, { method: "GET" });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.msg || `API 요청 실패: ${res.status}`);
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    throw error;
  }
};
