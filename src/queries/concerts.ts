import { getConcertDetail, getUpcomingConcerts } from "@/lib/api/concerts/concerts.client";

export const concertQueryKeys = {
  all: ["concert"] as const,

  upcoming: (sort: "UPCOMING", page = 0, size = 21) =>
    ["upcoming-concerts", sort, page, size] as const,
  ticketing: (sort: "TICKETING", page = 0, size = 21) =>
    ["ticketing-concerts", sort, page, size] as const,

  details: () => [...concertQueryKeys.all, "details"] as const,
  detail: (concertId: string) => [...concertQueryKeys.details(), concertId] as const, // 콘서트 상세 정보
};

export const concertQueries = {
  upcoming: (sort: "UPCOMING", page = 0, size = 21) => ({
    queryKey: concertQueryKeys.upcoming(sort, page, size),
    queryFn: () => getUpcomingConcerts({ sort, page, size }),
    staleTime: 60 * 60 * 1000, // 1시간 fresh
    gcTime: 3 * 60 * 60 * 1000, // 3시간 후 GC
  }),
  ticketing: (sort: "TICKETING", page = 0, size = 21) => ({
    queryKey: concertQueryKeys.ticketing(sort, page, size),
    queryFn: () => getUpcomingConcerts({ sort, page, size }),
    staleTime: 60 * 60 * 1000,
    gcTime: 3 * 60 * 60 * 1000,
  }),

  detail: (concertId: string) => ({
    queryKey: concertQueryKeys.detail(concertId),
    queryFn: () => getConcertDetail({ concertId }),
    staleTime: 5 * 60 * 1000,
  }),
};
