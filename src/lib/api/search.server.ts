import { ConcertDataWithLiked } from "@/components/concert/ConcertType";
import ServerApi from "@/utils/helpers/serverApi";
import { getIsLikedConcert } from "./concerts.server";

/**
 * 검색어로 공연 목록을 가져옵니다.
 * 서버 사이드에서 사용됩니다.
 *
 * @param {string} keyword 검색어
 * @param {number} page 페이지 번호 (기본값: 0)
 * @param {number} size 페이지당 항목 수 (기본값: 12)
 * @returns {Promise<ConcertData[]>} 공연 목록
 */
export const getSearchConcertsServer = async ({
  keyword,
  isAuthenticated,
  page = 0,
  size = 12,
}: {
  keyword: string;
  isAuthenticated: boolean;
  page?: number;
  size?: number;
}): Promise<ConcertDataWithLiked[]> => {
  try {
    const encodeKeyword = encodeURIComponent(keyword);
    const res = await ServerApi(
      `/api/v1/concerts/search?keyword=${encodeKeyword}&page=${page}&size=${size}`,
      {
        method: "GET",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch search concerts");
    }
    const data = await res.json();

    const concertsWithLiked = await Promise.all(
      data.data.map(async (concert: ConcertDataWithLiked) => {
        const concertId = concert.id.toString();
        let isLikedConcert = null;

        if (isAuthenticated) {
          isLikedConcert = await getIsLikedConcert(concertId);
        }

        return {
          ...concert,
          isLiked: isLikedConcert?.isLike ?? false,
        };
      })
    );

    return concertsWithLiked;
  } catch (error) {
    console.error("Error fetching search concerts:", error);
    return [];
  }
};
