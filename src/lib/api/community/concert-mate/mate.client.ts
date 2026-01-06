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
 * @param {string} postId - 게시글 ID
 */
export const deleteMatePost = async ({ postId }: { postId: string }): Promise<boolean> => {
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
