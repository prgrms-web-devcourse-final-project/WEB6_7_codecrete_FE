import { CommunityCategory, PostListResponse } from "@/types/community";
import ServerApi from "@/utils/helpers/serverApi";

/**
 * 카테고리별 게시글 목록 조회
 *
 * @param {CommunityCategory} category - 커뮤니티 카테고리
 * @returns {Promise<PostListResponse | null>} - 커뮤니티 글 목록 또는 null
 */
export const getPostsList = async ({
  // TODO : 백엔드 권한 수정 이후 다시
  category,
  page = 0,
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
    console.error("Error fetching posts list:", error);
    return null;
  }
};
