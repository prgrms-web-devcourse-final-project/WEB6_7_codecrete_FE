import { ResponseData } from "@/types/api";
import ClientApi from "@/utils/helpers/clientApi";

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
export const createNewPlan = async ({
  concertId,
  title,
  planDate,
}: {
  concertId: string;
  title: string;
  planDate: string;
}): Promise<ResponseData<Planner>> => {
  try {
    const res = await ClientApi("/api/v1/plans", {
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

// 플래너 계획 수정
export const updatePlanDetail = async ({
  planId,
  title,
  planDate,
}: {
  planId: string;
  title: string;
  planDate: string;
}): Promise<ResponseData<Planner>> => {
  try {
    const res = await ClientApi(`/api/v1/plans/update/${planId}`, {
      method: "PATCH",
      body: JSON.stringify({ title, planDate }),
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

// 플래너 계획 삭제
export const deletePlan = async ({ planId }: { planId: string }): Promise<void> => {
  try {
    const res = await ClientApi(`/api/v1/plans/delete/${planId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      throw new Error(`API 요청 실패: ${res.status}`);
    }
  } catch (error) {
    console.error("Error deleting planner:", error);
    throw error;
  }
};

// 플래너 공유 링크 생성
export const createPlanShareLink = async (
  planId: string
): Promise<{ planId: string; shareToken: string; shareLink: string }> => {
  try {
    const res = await ClientApi(`/api/v1/plans/${planId}/share/link`, {
      method: "POST",
    });
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

// 공유받은 링크로 접속 후 액세스 토큰 검증까지 완료되면 참가자로 넣기
export const joinPlanAsParticipant = async (shareToken: string): Promise<boolean> => {
  const res = await ClientApi(`/api/v1/plans/share/${shareToken}/accept`, { method: "POST" });
  return res.ok;
};

// 공유받은 링크로 접속 후 초대 거절
export const declinePlanAsParticipant = async (shareToken: string): Promise<boolean> => {
  const res = await ClientApi(`/api/v1/plans/share/${shareToken}/decline`, { method: "POST" });
  return res.ok;
};
