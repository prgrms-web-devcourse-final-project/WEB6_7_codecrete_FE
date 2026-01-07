import { MatePostWrite } from "@/types/community/concert-mate";
import ClientApi from "@/utils/helpers/clientApi";

// 구인글 작성
export const createMatePost = async (data: MatePostWrite): Promise<boolean> => {
  try {
    const res = await ClientApi(`/api/v1/join`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch (error) {
    console.error("Error Posting Mate:", error);
    return false;
  }
};

/**
 * 구인글 삭제하기
 *
 * @param {number} postId - 게시글 ID
 */
export const deleteMatePost = async ({ postId }: { postId: number }): Promise<boolean> => {
  try {
    const res = await ClientApi(`/api/v1/join/${postId}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch (error) {
    console.error("Error deleting mate post:", error);
    return false;
  }
};

/**
 * 구인글 마감하기
 *
 * @param {number} postId - 게시글 ID
 */
export const closeMatePost = async ({ postId }: { postId: number }): Promise<boolean> => {
  try {
    const res = await ClientApi(`/api/v1/join/${postId}/close`, {
      method: "PATCH",
    });
    return res.ok;
  } catch (error) {
    console.error("Error closing mate post:", error);
    return false;
  }
};

// 구인글 수정하기
export const updateMatePost = async ({
  postId,
  data,
}: {
  postId: number;
  data: MatePostWrite;
}): Promise<boolean> => {
  try {
    const payload = {
      concertId: data.concertId,
      title: data.title,
      content: data.content,
      maxParticipants: data.maxParticipants,
      genderPreference: data.genderPreference,
      // 선택적 필드들 (스웨거 이미지 참고)
      ageRangeMin: data.ageRangeMin,
      ageRangeMax: data.ageRangeMax,
      meetingAt: data.meetingAt,
      meetingPlace: data.meetingPlace,
      activityTags: data.activityTags || [],
    };

    const res = await ClientApi(`/api/v1/join/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    let json;
    try {
      json = await res.json();
    } catch {
      throw new Error("서버 응답을 처리할 수 없습니다.");
    }

    if (!res.ok || json.resultCode !== "OK") {
      let fallbackMsg = "게시글 수정 중 오류가 발생했습니다.";

      if (res.status === 401) {
        fallbackMsg = "인증이 필요한 서비스입니다.";
      } else if (res.status === 403) {
        fallbackMsg = "본인이 작성한 글만 수정할 수 있습니다.";
      } else if (res.status === 404) {
        fallbackMsg = "수정할 게시글이 존재하지 않습니다.";
      } else if (res.status >= 500) {
        fallbackMsg = "서버 내부 오류가 발생했습니다.";
      }

      throw new Error(json.msg ?? fallbackMsg);
    }

    return true;
  } catch (err) {
    if (err instanceof TypeError) {
      throw new Error("네트워크 연결이 원활하지 않습니다.");
    }

    if (err instanceof Error) {
      throw err;
    }

    throw new Error("알 수 없는 에러가 발생했습니다.");
  }
};
