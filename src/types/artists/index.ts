export type ApiResponse<T> = {
  status: number;
  resultCode: string;
  msg: string;
  data: T;
};

export type ArtistAlbum = {
  albumName: string;
  releaseDate: string;
  albumType: string;
  imageUrl: string;
  spotifyUrl: string;
};

export type ArtistTopTrack = {
  trackName: string;
  spotifyUrl: string;
};

export type RelatedArtist = {
  artistName: string;
  imageUrl: string | null;
  spotifyArtistId: string;
};

export interface ArtistDetail {
  artistName: string;
  artistGroup: string | null;
  artistType: "SOLO" | "GROUP";
  profileImageUrl: string;
  likeCount: number;
  totalAlbums: number;
  popularityRating: number;
  description: string;

  albums: ArtistAlbum[];
  topTracks: ArtistTopTrack[];
  relatedArtists: RelatedArtist[];
}

export type ArtistListResponse = ApiResponse<ArtistListItem[]>;
export type LikeArtistResponse = ApiResponse<null>;
export type ArtistDetailResponse = ApiResponse<ArtistDetail>;

export type ArtistListItem = {
  id: number;
  artistName: string;
  genreName: string; // 필요 x
  imageUrl: string;
  likeCount: number; // 필요 x
  isLiked: boolean;
};
