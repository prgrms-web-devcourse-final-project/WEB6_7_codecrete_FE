export type ApiResponse<T> = {
  status: number;
  resultCode: string;
  msg: string;
  data: T;
};

export type ArtistListResponse = ApiResponse<ArtistListItem[]>;
export type LikeArtistResponse = ApiResponse<null>;

export type ArtistListItem = {
  id: number;
  artistName: string;
  genreName: string; // 필요 x
  imageUrl: string;
  likeCount: number; // 필요 x
};
