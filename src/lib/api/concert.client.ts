import { LikeConcert } from "@/types/concerts";
import ClientApi from "@/utils/helpers/clientApi";

// 콘서트 찜하기
export const postLikeConcert = async (concertId: string): Promise<boolean> => {
  try {
    const res = await ClientApi(`/api/v1/concerts/like/${concertId}`, {
      method: "POST",
    });
    return res.ok;
  } catch (error) {
    console.error("Error liking concert:", error);
    return false;
  }
};

export const deleteLikeConcert = async (concertId: string): Promise<boolean> => {
  try {
    const res = await ClientApi(`/api/v1/concerts/dislike/${concertId}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch (error) {
    console.error("Error unliking concert:", error);
    return false;
  }
};

// 찜한 콘서트인지 확인
export const getIsLikedConcert = async (concertId: string): Promise<LikeConcert | null> => {
  try {
    const res = await ClientApi(`/api/v1/concerts/isLike/${concertId}`, {
      method: "GET",
    });

    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      return null;
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error checking liked concert:", error);
    return null;
  }
};
