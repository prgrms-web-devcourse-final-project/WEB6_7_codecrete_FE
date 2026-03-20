export const artistQueryKeys = {
  featured: (page = 0, size = 20, sort = "LIKE") =>
    ["artists", "featured", page, size, sort] as const,
};
