export type AutoCompleteConcerts = {
  name: string;
  id: number;
};

export type SearchArtist = {
  id: number;
  artistName: string;
  nameKo: string;
  artistGroup: string;
  likeCount: number;
  imageUrl: string;
};

export type SearchArtistWithLiked = SearchArtist & {
  isLiked: boolean;
};
