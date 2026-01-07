import ServerApi from "@/utils/helpers/serverApi";
import { getIsLikedConcert } from "../concerts/concerts.server";
import { ConcertDataWithLiked } from "@/types/concerts";
import { SearchArtist, SearchArtistWithLiked } from "@/types/search";
import { getIsLikedArtist } from "../artists/artists.server";

/**
 * 검색어로 공연 목록을 가져옵니다.
 * 서버 사이드에서 사용됩니다.
 *
 * @param {string} keyword 검색어
 * @param {number} page 페이지 번호 (기본값: 0)
 * @param {number} size 페이지당 항목 수 (기본값: 12)
 * @returns {Promise<ConcertData[]>} 공연 목록
 */
export const getSearchConcerts = async ({
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
    const encodedKeyword = encodeURIComponent(keyword);
    const res = await ServerApi(
      `/api/v1/concerts/search?keyword=${encodedKeyword}&page=${page}&size=${size}`,
      {
        method: "GET",
      }
    );
    if (!res.ok) {
      return [];
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

/**
 * 검색어로 공연 검색 결과의 갯수를 가져옵니다.
 */
export const getSearchConcertsCount = async ({ keyword }: { keyword: string }): Promise<number> => {
  try {
    const encodedKeyword = encodeURIComponent(keyword);
    const res = await ServerApi(`/api/v1/concerts/searchCount?keyword=${encodedKeyword}`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch search concerts count");
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching search concerts count:", error);
    return 0;
  }
};

/**
 * 검색어로 아티스트 목록을 가져옵니다.
 *
 * @param {string} artistName - 검색할 아티스트 이름
 * @returns {Promise<SearchArtist[]>} 아티스트 목록
 */
export const getSearchArtistsWithLiked = async ({
  artistName,
  size,
}: {
  artistName: string;
  size?: number;
}): Promise<SearchArtistWithLiked[]> => {
  try {
    const res = await ServerApi("/api/v1/artists/search", {
      method: "POST",
      body: JSON.stringify({ artistName }),
    });
    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    const artistsWithLike = await Promise.all(
      data.data.map(async (artist: SearchArtist) => {
        try {
          const isLiked = await getIsLikedArtist(artist.id);
          return {
            ...artist,
            isLiked,
          };
        } catch (error) {
          console.error("Error checking liked artist:", error);
          return {
            ...artist,
            isLiked: false,
          };
        }
      })
    );

    if (!size) return artistsWithLike;
    return artistsWithLike.slice(0, size);
  } catch (error) {
    console.error("Error fetching search artists:", error);
    return [];
  }
};
