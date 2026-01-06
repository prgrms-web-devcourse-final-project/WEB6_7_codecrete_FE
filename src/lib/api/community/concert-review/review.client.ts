// 리뷰글 작성
import { ConcertReviewListResponse, ReviewPostWrite } from "@/types/community/concert-review";
import ClientApi from "@/utils/helpers/clientApi";

export const createReviewPost = async (data: ReviewPostWrite): Promise<boolean> => {
  try {
    const formData = new FormData();

    // 필수 필드
    formData.append("concertId", String(data.concertId));
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("rating", String(data.rating));

    // 태그 (옵션)
    if (data.activityTags.length > 0) {
      data.activityTags.forEach((tag) => {
        formData.append("tags", tag);
      });
    }

    // 이미지 (옵션)
    if (data.images && data.images.length > 0) {
      data.images.forEach((file) => {
        formData.append("images", file);
      });
    }

    const res = await ClientApi(`/api/v1/reviews`, {
      method: "POST",
      body: formData,
    });

    return res.ok;
  } catch (error) {
    console.error("Error Create Review:", error);
    return false;
  }
};

export const deleteReviewPost = async (postId: number): Promise<boolean> => {
  try {
    const res = await ClientApi(`/api/v1/reviews/${postId}`, {
      method: "DELETE",
    });

    let json;

    try {
      json = await res.json();
    } catch {
      throw new Error("서버 응답을 처리할 수 없습니다.");
    }

    if (!res.ok || json.resultCode !== "OK") {
      let fallbackMsg = "게시글 삭제 중 오류가 발생했습니다.";

      if (res.status === 401) {
        fallbackMsg = "인증이 필요한 서비스입니다.";
      } else if (res.status === 403) {
        fallbackMsg = "본인이 작성한 글만 삭제할 수 있습니다.";
      } else if (res.status === 404) {
        fallbackMsg = "삭제할 게시글이 존재하지 않습니다.";
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

// 후기 목록 불러오기
export const getConcertReviewList = async (
  concertId: number
): Promise<ConcertReviewListResponse> => {
  const res = await ClientApi(`/api/v1/reviews/concert/${concertId}`, {
    method: "GET",
  });

  let json;
  try {
    json = await res.json();
  } catch {
    throw new Error("서버 응답을 처리할 수 없습니다.");
  }

  if (!res.ok || json.resultCode !== "OK") {
    throw new Error(json.msg ?? "후기 목록을 불러오는데 실패했습니다.");
  }

  return json.data as ConcertReviewListResponse;
};
