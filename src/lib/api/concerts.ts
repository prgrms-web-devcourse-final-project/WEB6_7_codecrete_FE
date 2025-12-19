import { Concert, ConcertWithTicket, ResponseData } from "@/types/home";

const createEmptyResponse = (message: string): ResponseData<ConcertWithTicket[]> => ({
  status: 500,
  resultCode: "ERROR",
  msg: message,
  data: [],
});

// TODO : 현재 그냥 다가오는 공연만 가져오도록 작업. 나중에는 예매 임박 순으로 바꿀것
export const getUpcomingConcerts = async ({
  page = 0,
  size = 20,
}: {
  page?: number;
  size?: number;
} = {}): Promise<ResponseData<ConcertWithTicket[]>> => {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const url = new URL(`${baseURL}/api/v1/concerts/list/UPCOMING`);
    url.searchParams.append("page", page.toString());
    url.searchParams.append("size", size.toString());

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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
          const ticketRes = await fetch(
            `${baseURL}/api/v1/concerts/ticketOffices?concertId=${concert.id}`,
            {
              credentials: "include",
              cache: "no-store",
            }
          );

          if (!ticketRes.ok) {
            console.error(`Ticket API Error for concert ${concert.id}:`, ticketRes.status);
            return concert;
          }

          const ticketOffices = await ticketRes.json();

          return {
            ...concert,
            ticketOfficeName: ticketOffices.data[0]?.ticketOfficeName,
            ticketOfficeUrl: ticketOffices.data[0]?.ticketOfficeUrl,
          };
        } catch (error) {
          console.error(`Error fetching ticket info for concert ${concert.id}:`, error);
          // 에러 나도 콘서트 정보는 유지
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
