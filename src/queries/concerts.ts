export const concertsQueryKeys = {
  upcoming: (sort: "UPCOMING", page = 0, size = 21) =>
    ["upcoming-concerts", sort, page, size] as const,
  ticketing: (sort: "TICKETING", page = 0, size = 21) =>
    ["ticketing-concerts", sort, page, size] as const,
};
