import { ResponseData } from "@/types/api";
import { Concert } from "@/types/home";
import ClientApi from "@/utils/helpers/clientApi";
import { PAGE_SIZE } from "@/utils/helpers/constants";
import { createEmptyResponse } from "@/utils/helpers/createEmptyResponse";

// TODO : 임시로 타입 정의 나중에 삭제 필요
type Artist = {
  artistId: number;
  artistName: string;
  nameKo: string;
  imageUrl: string;
  isLiked: boolean;
};

/**
 * 찜한 공연 목록 조회
 *
 * @param {number} page 페이지 번호 (기본값: 0)
 * @param {number} size 페이지 크기 (기본값: 12)
 * @returns {Promise<ResponseData<Concert[] | null>>} 찜한 공연 목록 데이터
 */
export const getLikedConcertList = async ({
  page = 0,
  size = PAGE_SIZE,
}: {
  page?: number;
  size?: number;
}): Promise<ResponseData<Concert[] | null>> => {
  try {
    const res = await ClientApi(`/api/v1/concerts/likedConcertList?page=${page}&size=${size}`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("찜한 공연 목록을 불러오는데 실패했습니다.");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching concert venue info:", error);
    return createEmptyResponse("공연장 정보를 가져오는데 실패했습니다");
  }
};

export const getLikedArtistList = async (): Promise<ResponseData<Artist[] | null>> => {
  try {
    const res = await ClientApi(`/api/v1/artists/likes`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("찜한 아티스트 목록을 불러오는데 실패했습니다.");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching liked artist list:", error);
    return createEmptyResponse("찜한 아티스트 목록을 가져오는데 실패했습니다");
  }
};
