import { MateDetailData } from "@/types/community/concert-mate";
import ServerApi from "@/utils/helpers/serverApi";

/**
 * 구인 게시글 상세 조회
 * @param {string} postId  - 게시글 ID
 * @returns {Promise<MateDetailData | null>} - 게시글 상세 정보 또는 null
 */
export const getPostsDetail = async ({
  postId,
}: {
  postId: string;
}): Promise<MateDetailData | null> => {
  try {
    const res = await ServerApi(`/api/v1/join/${postId}`, {
      method: "GET",
    });

    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      return null;
    }

    const data = await res.json();

    return data.data;
  } catch (error) {
    console.error("Error fetching concert mate detail:", error);
    return null;
  }
};
