import { getConcertDetail, getUpcomingConcerts } from "@/lib/api/concerts/concerts.client";

export const concertQueryKeys = {
  all: ["concert"] as const,

  upcoming: (sort: "UPCOMING", page = 0, size = 21) =>
    [...concertQueryKeys.all, "home", { sort, page, size }] as const,
  ticketing: (sort: "TICKETING", page = 0, size = 21) =>
    [...concertQueryKeys.all, "home", { sort, page, size }] as const,

  list: (sort: "REGISTERED", page = 0, size = 12) =>
    [...concertQueryKeys.all, "list", { sort, page, size }] as const,

  details: () => [...concertQueryKeys.all, "details"] as const,
  detail: (concertId: string) => [...concertQueryKeys.details(), concertId] as const, // 콘서트 상세 정보
};

/**
 * 공연 관련 쿼리 정의
 * - upcoming: 다가오는 공연 목록 (UPCOMING)
 * - ticketing: 티켓팅 중인 공연 목록 (TICKETING)
 * - detail: 특정 공연의 상세 정보
 * - list: 공연 목록 (REGISTERED)
 */
export const concertQueries = {
  upcoming: (sort: "UPCOMING", page = 0, size = 21) => ({
    queryKey: concertQueryKeys.upcoming(sort, page, size),
    queryFn: () => getUpcomingConcerts({ sort, page, size }),
    staleTime: 60 * 60 * 1000,
    gcTime: 3 * 60 * 60 * 1000,
  }),
  ticketing: (sort: "TICKETING", page = 0, size = 21) => ({
    queryKey: concertQueryKeys.ticketing(sort, page, size),
    queryFn: () => getUpcomingConcerts({ sort, page, size }),
    staleTime: 60 * 60 * 1000,
    gcTime: 3 * 60 * 60 * 1000,
  }),
  list: (sort: "REGISTERED", page = 0, size = 12) => ({
    queryKey: concertQueryKeys.list(sort, page, size),
    queryFn: () => ({ sort, page, size }),
    staleTime: 60 * 60 * 1000,
    gcTime: 3 * 60 * 60 * 1000,
  }),
  detail: (concertId: string) => ({
    queryKey: concertQueryKeys.detail(concertId),
    queryFn: () => getConcertDetail({ concertId }),
    staleTime: 5 * 60 * 1000,
  }),
};
