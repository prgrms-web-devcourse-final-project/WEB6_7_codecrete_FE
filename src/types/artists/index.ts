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
  id: number;
  artistName: string;
  nameKo: string;
  imageUrl: string | null;
  spotifyArtistId: string;
};

export interface ArtistDetail {
  id: number;
  artistName: string;
  nameKo: string;
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

export type ArtistListContent = {
  id: number;
  artistName: string;
  nameKo: string | null;
  artistGroup: string | null;
  genres: string[];
  likeCount: number;
  imageUrl: string;
  isLiked: boolean;
};

export type ArtistListData = {
  content: ArtistListContent[];
};

export type ArtistListResponse = ApiResponse<ArtistListData>;
export type LikeArtistResponse = ApiResponse<null>;
export type ArtistDetailResponse = ApiResponse<ArtistDetail>;

export type ArtistListSortSelectProps = {
  onValueChange?: (value: string) => void;
  sortList?: {
    value: string;
    name: string;
  }[];
  defaultValue: string;
};

export type IsLikedArtistData = {
  isLiked: boolean;
};

export type IsLikedArtistsResponse = ApiResponse<IsLikedArtistData | null>;
