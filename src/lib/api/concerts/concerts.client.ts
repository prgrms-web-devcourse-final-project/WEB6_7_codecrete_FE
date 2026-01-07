import { CommentResponse } from "@/types/community";
import { ConcertDetail, LikeConcert } from "@/types/concerts";
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

/**
 * 공연 ID로 공연 상세 정보 가져오기
 *
 * @param {string} concertId - 공연 ID
 * @returns {Promise<ConcertDetail | null>} - 공연 상세 정보 또는 null
 */
export const getConcertDetail = async ({
  concertId,
}: {
  concertId: string;
}): Promise<ConcertDetail | null> => {
  try {
    const res = await ClientApi(`/api/v1/concerts/concertDetail?concertId=${concertId}`, {
      method: "GET",
    });

    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      return null;
    }

    const data = await res.json();

    return data.data;
  } catch (error) {
    console.error("Error fetching concert detail:", error);
    return null;
  }
};

/**
 * 댓글 목록 조회
 *
 * @param {string} postId - 게시글 ID
 * @returns {Promise<CommentResponse | null>} - 커뮤니티 글 목록 또는 null
 */
export const getCommentsList = async ({
  postId,
  page = 1,
}: {
  postId: number;
  page?: number;
}): Promise<CommentResponse | null> => {
  try {
    const res = await ClientApi(`/api/v1/posts/${postId}/comments?page=${page}`, {
      method: "GET",
    });

    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      return null;
    }

    const data = await res.json();

    return data.data;
  } catch (error) {
    console.error("Error fetching comment list:", error);
    return null;
  }
};
