import { ResponseData } from "@/types/api";
import { PlannerParticipant, PlannerParticipantRole } from "@/types/planner";
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

// 플래너 공유 링크 삭제
export const deletePlanShareLink = async (planId: string): Promise<void> => {
  try {
    const res = await ClientApi(`/api/v1/plans/${planId}/share/link`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.msg || `API 요청 실패: ${res.status}`);
    }
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

// 플래너 참가자 목록 조회
export const getPlanParticipants = async (planId: string): Promise<PlannerParticipant[]> => {
  try {
    const res = await ClientApi(`/api/v1/plans/${planId}/participants`, {
      method: "GET",
    });
    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      throw new Error(`API 요청 실패: ${res.status}`);
    }
    const data = await res.json();
    return data.data.participants;
  } catch (error) {
    console.error("Error fetching participants:", error);
    throw error;
  }
};

// 플래너 참가자 추방
export const deletePlanParticipant = async ({
  planId,
  participantId,
}: {
  planId: string;
  participantId: string;
}): Promise<void> => {
  try {
    const res = await ClientApi(`/api/v1/plans/${planId}/participants/${participantId}/kick`, {
      method: "DELETE",
    });
    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      throw new Error(`API 요청 실패: ${res.status}`);
    }
  } catch (error) {
    console.error("Error deleting participant:", error);
    throw error;
  }
};

// 플래너 참가자 권한 변경
export const updatePlanParticipantRole = async ({
  planId,
  participantId,
  participantUpdateRole,
  participantCurrentRole,
  ownerParticipantId,
}: {
  planId: string;
  participantId: string;
  participantUpdateRole: PlannerParticipantRole;
  participantCurrentRole: PlannerParticipantRole;
  ownerParticipantId: string;
}): Promise<void> => {
  try {
    // 현재 역할과 변경할 역할이 같으면 아무 작업도 수행하지 않음
    if (participantCurrentRole === participantUpdateRole) {
      return;
    }

    const res = await ClientApi(`/api/v1/plans/${planId}/participants/${participantId}/role`, {
      method: "PATCH",
      body: JSON.stringify({ role: participantUpdateRole }),
    });
    if (!res.ok) {
      throw new Error(`API 요청 실패: ${res.status}`);
    }

    // 변경할 역할이 OWNER인 경우, 현재 플랜의 소유자 권한을 EDITOR로 변경
    if (participantUpdateRole === "OWNER") {
      const resOwnerChange = await ClientApi(
        `/api/v1/plans/${planId}/participants/${ownerParticipantId}/role`,
        {
          method: "PATCH",
          body: JSON.stringify({ role: "EDITOR" }),
        }
      );
      if (!resOwnerChange.ok) {
        // 롤백: 첫 번째 변경을 원래대로 되돌리기
        try {
          await ClientApi(`/api/v1/plans/${planId}/participants/${participantId}/role`, {
            method: "PATCH",
            body: JSON.stringify({ role: participantCurrentRole }),
          });
        } catch (rollbackError) {
          console.error("권한 변경 롤백 실패:", rollbackError);
        }
        throw new Error("OWNER 권한 이전 중 오류가 발생했습니다. 변경이 취소되었습니다.");
      }
    }
  } catch (error) {
    console.error("Error updating participant role:", error);
    throw error;
  }
};
