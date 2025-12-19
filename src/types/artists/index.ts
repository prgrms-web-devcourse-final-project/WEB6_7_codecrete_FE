export type ArtistListResponse = {
  status: number;
  resultCode: string;
  msg: string;
  data: ArtistListItem[];
};

export type ArtistListItem = {
  id: number;
  artistName: string;
  genreName: string;
  imageUrl: string;
  likeCount: number;
};
