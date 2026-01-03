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

// 아티스트 검색 데이터
export type ArtistSearchResult = {
  // id 아직 없음
  artistName: string;
  nameKo: string | null;
  artistGroup: string | null;
  likeCount: number;
  // TODO : 있어야 하는 데이터 id, imageUrl
};
