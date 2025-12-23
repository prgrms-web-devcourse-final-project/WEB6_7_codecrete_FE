import { ConcertDetail, TicketOffice } from "@/types/concerts";
import { Concert, ConcertWithTicket, ResponseData } from "@/types/home";
import ClientApi from "@/utils/helpers/clientApi";

// 빈 응답 생성 함수
const createEmptyResponse = (message: string): ResponseData<ConcertWithTicket[]> => ({
  status: 500,
  resultCode: "ERROR",
  msg: message,
  data: [],
});

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
} = {}): Promise<ResponseData<ConcertWithTicket[]>> => {
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

    // 좋아요 여부까지 가져오기
    // const likeRes = await ClientApi(`/api/v1/concerts/isLike/${concertId}`, {
    //   method: "GET",
    //   cache: "no-store",
    // });

    // if (!likeRes.ok) {
    //   console.error("Like API Error:", likeRes.status);
    //   return data; // 좋아요 정보 없이 기본 데이터 반환
    // }

    // const likeData = await likeRes.json();

    return data;
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
export const getConcertVenueInfo = async ({ concertId }: { concertId: string }) => {
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

// 어드민 : 티켓팅 시간 등록
export const patchTicketTimeSet = async ({
  concertId,
  startDateTime,
  endDateTime,
}: {
  concertId: string;
  startDateTime: string;
  endDateTime: string;
}): Promise<ResponseData<ConcertDetail | null>> => {
  try {
    const res = await ClientApi(`/api/v1/concerts/ticketTimeSet`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        concertId,
        startDateTime,
        endDateTime,
      }),
    });
    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      return {
        status: res.status,
        resultCode: "ERROR",
        msg: `API 요청 실패: ${res.status}`,
        data: null,
      };
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error setting ticket time:", error);
    return {
      status: 500,
      resultCode: "ERROR",
      msg: "티켓팅 시간 등록에 실패했습니다",
      data: null,
    };
  }
};
