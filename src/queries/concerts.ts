import { getUpcomingConcerts } from "@/lib/api/concerts/concerts.client";

export const concertQueryKeys = {
  upcoming: (sort: "UPCOMING", page = 0, size = 21) =>
    ["upcoming-concerts", sort, page, size] as const,
  ticketing: (sort: "TICKETING", page = 0, size = 21) =>
    ["ticketing-concerts", sort, page, size] as const,
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
};
