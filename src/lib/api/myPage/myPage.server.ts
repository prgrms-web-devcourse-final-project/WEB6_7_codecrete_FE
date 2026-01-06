import { ResponseData } from "@/types/api";
import { Concert, ConcertWithTicket } from "@/types/home";
import { LikedArtist } from "@/types/my-page";
import { PAGE_SIZE } from "@/utils/helpers/constants";
import { createEmptyResponse } from "@/utils/helpers/createEmptyResponse";
import ServerApi from "@/utils/helpers/serverApi";
import { getTicketOfficesByConcertId } from "../concerts/concerts.server";

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
    const res = await ServerApi(`/api/v1/concerts/likedConcertList?page=${page}&size=${size}`, {
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

/**
 * 찜한 공연 수 조회
 *
 * @returns {Promise<ResponseData<number | null>>} 찜한 공연 수 데이터
 */
export const getLikedConcertCount = async (): Promise<ResponseData<number | null>> => {
  try {
    const res = await ServerApi(`/api/v1/concerts/likedConcertCount`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("찜한 공연 수를 불러오는데 실패했습니다.");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching liked concert count:", error);
    return createEmptyResponse("찜한 공연 수를 가져오는데 실패했습니다");
  }
};

export const getLikedArtistList = async (): Promise<ResponseData<LikedArtist[] | null>> => {
  try {
    const res = await ServerApi(`/api/v1/artists/likes`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("찜한 아티스트 목록을 불러오는데 실패했습니다.");
    }
    const data = (await res.json()) as ResponseData<LikedArtist[] | null>;
    const forced: ResponseData<LikedArtist[] | null> = Array.isArray(data?.data)
      ? { ...data, data: data.data.map((artist) => ({ ...artist, isLiked: true })) }
      : data;
    return forced;
  } catch (error) {
    console.error("Error fetching liked artist list:", error);
    return createEmptyResponse("찜한 아티스트 목록을 가져오는데 실패했습니다");
  }
};

/**
 * 찜한 공연 전체 목록 조회 (최대 1000개)
 * @returns {Promise<ResponseData<ConcertWithTicket[] | []>>} 찜한 공연 전체 목록 데이터
 */
export const getAllLikedConcerts = async (
  size = 1000
): Promise<ResponseData<ConcertWithTicket[] | null>> => {
  try {
    const res = await ServerApi(`/api/v1/concerts/likedConcertList?page=0&size=${size}`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("찜한 공연 목록을 불러오는데 실패했습니다.");
    }
    const data = await res.json();
    const concertsWithTicketLinks = await Promise.all(
      data.data.map(async (concert: Concert) => {
        try {
          const ticketOffices = await getTicketOfficesByConcertId({ concertId: concert.id });

          const firstOffice = ticketOffices?.[0];

          return {
            ...concert,
            ticketOfficeName: firstOffice?.ticketOfficeName,
            ticketOfficeUrl: firstOffice?.ticketOfficeUrl,
          };
        } catch (error) {
          console.error(`Error fetching ticket info for concert ${concert.id}:`, error);
          return concert;
        }
      })
    );

    return {
      ...data,
      data: concertsWithTicketLinks,
    };
  } catch (error) {
    console.error("Error fetching concert venue info:", error);
    return createEmptyResponse("찜한 공연 목록을 가져오는데 실패했습니다");
  }
};
// TODO : 찜한 아티스트 싹 불러오기
// TODO : 내가 속한 외출플래너 싹 불러오기
// TODO : 내가 찜한 콘서트에서 예정된 콘서트 필터링
// TODO : 최근 찜한 콘서트/아티스트 구분없이 3개까지만
