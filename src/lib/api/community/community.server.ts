import {
  CommentResponse,
  CommunityCategory,
  LikeMeResponse,
  PostListResponse,
} from "@/types/community";
import ServerApi from "@/utils/helpers/serverApi";
// TODO : postId 매개변수의 데이터 유형이 일관성 확보

/**
 * 카테고리별 게시글 목록 조회
 *
 * @param {CommunityCategory} category - 커뮤니티 카테고리
 * @returns {Promise<PostListResponse | null>} - 커뮤니티 글 목록 또는 null
 */
export const getPostsList = async ({
  category,
  page = 1,
}: {
  category: CommunityCategory;
  page: number;
}): Promise<PostListResponse | null> => {
  try {
    const res = await ServerApi(`/api/v1/posts/category/${category}?page=${page}`, {
      method: "GET",
    });

    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      return null;
    }

    const data = await res.json();

    return data.data;
  } catch (error) {
    console.error("Error fetching concert mate posts list:", error);
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
  page: number;
}): Promise<CommentResponse | null> => {
  try {
    const res = await ServerApi(`/api/v1/posts/${postId}/comments?page=${page}`, {
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

// 게시글 좋아요 여부
export async function getPostLikeMe(postId: number): Promise<boolean> {
  try {
    const res = await ServerApi(`/api/v1/posts/${postId}/likes/me`, {
      method: "GET",
    });

    // 로그인 안 한 경우 → 좋아요 안 한 상태로 취급
    if (res.status === 401) {
      return false;
    }

    if (!res.ok) {
      console.error("getPostLikeMe failed:", res.status);
      return false;
    }

    const json = (await res.json()) as LikeMeResponse;

    if (json.resultCode !== "OK") {
      console.warn("Unexpected resultCode:", json.resultCode);
      return false;
    }

    return json.data;
  } catch (e) {
    console.error("getPostLikeMe error:", e);
    return false;
  }
}

/**
 * 게시글 좋아요 수 조회
 *
 * @param {string} postId - 게시글 ID
 * @returns {Promise<string | null>} - 좋아요 갯수 또는 null
 */
export const getLikesCount = async ({ postId }: { postId: number }): Promise<string | null> => {
  try {
    const res = await ServerApi(`/api/v1/posts/${postId}/likes/count`, {
      method: "GET",
    });

    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      return null;
    }

    const data = await res.json();

    return data.data;
  } catch (error) {
    console.error("Error counting likes:", error);
    return null;
  }
};
