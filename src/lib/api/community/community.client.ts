import { CommentResponse, CreateCommentRequest } from "@/types/community";
import ClientApi from "@/utils/helpers/clientApi";
import { LikeToggleResponse } from "@/types/community";

// 해당 포스트의 좋아요 수 불러오기
export const getPostLikeCount = async (postId: number): Promise<number> => {
  const res = await ClientApi(`/api/v1/posts/${postId}/likes/count`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("좋아요 개수를 불러오지 못했습니다.");
  }

  const json = await res.json();
  return json.data;
};

// 해당 글에 대한 좋아요 토글 함수
export const togglePostLike = async (postId: number): Promise<void> => {
  try {
    const res = await ClientApi(`/api/v1/posts/${postId}/likes`, {
      method: "POST",
    });

    let json: LikeToggleResponse;

    try {
      json = (await res.json()) as LikeToggleResponse;
    } catch {
      throw new Error("서버 응답을 처리할 수 없습니다.");
    }

    if (!res.ok || json.resultCode !== "OK") {
      let fallbackMsg = "좋아요 처리 중 오류가 발생했습니다.";

      if (res.status === 401) {
        fallbackMsg = "로그인이 필요한 기능입니다.";
      } else if (res.status === 403) {
        fallbackMsg = "좋아요를 누를 권한이 없습니다.";
      } else if (res.status === 404) {
        fallbackMsg = "게시글을 찾을 수 없습니다.";
      } else if (res.status >= 500) {
        fallbackMsg = "서버 오류가 발생했습니다.";
      }

      throw new Error(json.msg ?? fallbackMsg);
    }

    return;
  } catch (err) {
    if (err instanceof TypeError) {
      throw new Error("네트워크 연결이 원활하지 않습니다.");
    }

    if (err instanceof Error) {
      throw err;
    }

    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};

/**
 * 게시글 댓글 작성하기
 *
 * @param {string} postId - 게시글 ID
 * @param {CreateCommentRequest} data - 댓글 데이터 (content)
 * @returns {Promise<CommentResponse | null>} - 작성된 댓글 객체 또는 null
 * 작성 댓글을 바로 보여주기 위한 반환값
 */
export const createComment = async ({
  postId,
  data,
}: {
  postId: string;
  data: CreateCommentRequest;
}): Promise<CommentResponse | null> => {
  try {
    const res = await ClientApi(`/api/v1/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify(data),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      return null;
    }

    const resComment = await res.json();
    return resComment.data;
  } catch (error) {
    console.error("Error Writing a comment:", error);
    return null;
  }
};

/**
 * 게시글 댓글 삭제하기
 *
 * @param {string} postId - 게시글 ID
 * @param {string} commentId - 댓글 ID
 */
export const deleteComment = async ({
  postId,
  commentId,
}: {
  postId: string;
  commentId: string;
}): Promise<boolean> => {
  try {
    const res = await ClientApi(`/api/v1/posts/${postId}/comments/${commentId}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch (error) {
    console.error("Error deleting comment:", error);
    return false;
  }
};
