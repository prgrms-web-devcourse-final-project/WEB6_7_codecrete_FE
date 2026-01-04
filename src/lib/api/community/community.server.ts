import { CommunityCategory, PostListResponse } from "@/types/community";
import ServerApi from "@/utils/helpers/serverApi";

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
    const res = await ServerApi(`/api/v1/posts/category/${category}?page=${page}&size=5`, {
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
