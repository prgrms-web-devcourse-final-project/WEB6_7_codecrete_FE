// 리뷰글 작성
import { ReviewPostWrite } from "@/types/community/concert-review";
import ClientApi from "@/utils/helpers/clientApi";

export const createReviewPost = async (data: ReviewPostWrite): Promise<boolean> => {
  try {
    const res = await ClientApi(`/api/v1/reviews`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch (error) {
    console.error("Error Create Review:", error);
    return false;
  }
};
