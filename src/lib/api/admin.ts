"use server";

import { ConcertData } from "@/components/concert/ConcertType";
import { ResponseData } from "@/types/api";
import { ConcertDetail } from "@/types/concerts";
import ClientApi from "@/utils/helpers/clientApi";
import { cookies } from "next/headers";

/**
 * 티켓팅 시간 등록
 *
 * @param {string} concertId - 공연 ID
 * @param {string} startDateTime - 티켓팅 시작 시간 (ISO 8601 형식)
 * @param {string} endDateTime - 티켓팅 종료 시간 (ISO 8601 형식)
 * @returns {Promise<ResponseData<ConcertDetail | null>>} - 업데이트된 공연 상세 정보
 */
export const patchTicketTimeSet = async ({
  concertId,
  ticketTime,
  ticketEndTime,
}: {
  concertId: string;
  ticketTime: string;
  ticketEndTime: string;
}): Promise<ResponseData<ConcertDetail | null>> => {
  const cookieStore = await cookies();

  try {
    const res = await ClientApi(`/api/v1/admin/concerts/ticketTimeSet`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify({
        concertId,
        ticketTime,
        ticketEndTime,
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

/**
 * 티켓팅 시간이 없는 공연 목록 가져오기
 * @returns
 */
export const getNoTicketTimeLists = async ({
  page = 0,
  size,
}: {
  page: number;
  size: number;
}): Promise<ConcertData[] | null> => {
  const cookieStore = await cookies();
  try {
    const res = await ClientApi(
      `/api/v1/admin/concerts/noTicketTimeList?page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("데이터 패치 실패");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching no ticket time lists:", error);
    return null;
  }
};
