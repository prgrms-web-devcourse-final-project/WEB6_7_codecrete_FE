import { getArtists } from "@/lib/api/artists/artists.client";

export const artistQueryKeys = {
  featured: (page = 0, size = 20, sort = "LIKE") =>
    ["artists", "featured", page, size, sort] as const,
};

export const artistQueries = {
  featured: (page = 0, size = 20, sort = "LIKE") => ({
    queryKey: artistQueryKeys.featured(page, size, sort),
    queryFn: () => getArtists(page, size, sort),
    staleTime: 60 * 60 * 1000,
    gcTime: 3 * 60 * 60 * 1000,
  }),
};
