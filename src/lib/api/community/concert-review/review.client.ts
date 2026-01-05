// 리뷰글 작성
import { ReviewPostWrite } from "@/types/community/concert-review";
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
