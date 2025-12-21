export type ArtistListResponse = {
  status: number;
  resultCode: string;
  msg: string;
  data: ArtistListItem[];
};

export type ArtistListItem = {
  id: number;
  artistName: string;
  genreName: string; // 필요 x
  imageUrl: string;
  likeCount: number; // 필요 x
};
