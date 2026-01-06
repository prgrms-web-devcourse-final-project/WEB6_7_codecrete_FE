import ServerApi from "@/utils/helpers/serverApi";
import { ReviewDetailData, ReviewDetailResponse } from "@/types/community/concert-review";

/**
 * post ID로 후기글 상세 정보 가져오기
 *
 * @param {number} postId - 후기글 ID
 * @returns {Promise<ReviewDetailData | null>} - 후기글 상세 정보 또는 null
 */
export const getReviewDetail = async (postId: number): Promise<ReviewDetailData | null> => {
  try {
    const res = await ServerApi(`/api/v1/reviews/${postId}`, {
      method: "GET",
    });

    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      return null;
    }

    const data = (await res.json()) as ReviewDetailResponse;
    return data.data;
  } catch (error) {
    console.error("Error fetching review detail:", error);
    return null;
  }
};
