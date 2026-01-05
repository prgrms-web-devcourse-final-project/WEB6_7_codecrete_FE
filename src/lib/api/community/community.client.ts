import { CommentResponse, CreateCommentRequest } from "@/types/community";
import ClientApi from "@/utils/helpers/clientApi";

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
    });
    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      return null;
    }

    const resComment = await res.json();
    return resComment.data; // 확인 필요
  } catch (error) {
    console.error("Error Writing a comment:", error);
    return null;
  }
};
