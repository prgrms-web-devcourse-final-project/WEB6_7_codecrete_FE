import { ResponseData } from "@/types/api";
import { ConcertDetail, ConcertVenueInfo, LikeConcert, TicketOffice } from "@/types/concerts";
import { Concert, ConcertWithTicket } from "@/types/home";
import ClientApi from "@/utils/helpers/clientApi";
import { createEmptyResponse } from "@/utils/helpers/createEmptyResponse";

/**
 * 다가오는 공연 목록 가져오기
 *
 * @param {number} page - 페이지 번호 (기본값: 0)
 * @param {number} size - 페이지 크기 (기본값: 20)
 * @returns {Promise<ResponseData<ConcertWithTicket[]>>} - 공연 목록 데이터
 */
export const getUpcomingConcerts = async ({
  page = 0,
  size = 20,
}: {
  page?: number;
  size?: number;
} = {}): Promise<ResponseData<ConcertWithTicket[] | null>> => {
  try {
    const res = await ClientApi(`/api/v1/concerts/list/UPCOMING?page=${page}&size=${size}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      return createEmptyResponse(`API 요청 실패: ${res.status}`);
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
    console.error("Error fetching upcoming concerts:", error);
    return createEmptyResponse("콘서트 목록을 가져오는데 실패했습니다");
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
      cache: "no-store",
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
 * 공연 ID로 공연장 정보 가져오기
 *
 * @param {string} concertId - 공연 ID
 * @returns {Promise<ConcertVenueInfo | null>} - 공연장 정보 또는 null
 */
export const getConcertVenueInfo = async ({
  concertId,
}: {
  concertId: string;
}): Promise<ResponseData<ConcertVenueInfo | null>> => {
  try {
    const res = await ClientApi(`/api/v1/concerts/placeDetail?concertId=${concertId}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      return createEmptyResponse(`API 요청 실패: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching concert venue info:", error);
    return createEmptyResponse("공연장 정보를 가져오는데 실패했습니다");
  }
};

/**
 * 공연 ID로 티켓팅 플랫폼 정보 가져오기
 *
 * @param {string} concertId - 공연 ID
 * @returns {Promise<TicketOffice | null>} - 티켓팅 플랫폼 정보 또는 null
 */
export const getTicketOfficesByConcertId = async ({
  concertId,
}: {
  concertId: string;
}): Promise<TicketOffice[] | null> => {
  try {
    const res = await ClientApi(`/api/v1/concerts/ticketOffices?concertId=${concertId}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Ticket API Error for concert ${concertId}:`, res.status);
      return null;
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching ticket info for concert ${concertId}:`, error);
    return null;
  }
};

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
export const getIsLikedConcert = async (
  concertId: string,
  cookie: string
): Promise<LikeConcert | null> => {
  try {
    const res = await ClientApi(`/api/v1/concerts/isLike/${concertId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      cache: "no-store",
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

// 공연 리스트 - 전체 공연 수 불러오기
export const totalConcertCount = async () => {
  try {
    const res = await ClientApi(`/api/v1/concerts/totalConcertCount`, {
      method: "GET",
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      return null;
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching total concert count:", error);
    return null;
  }
};
