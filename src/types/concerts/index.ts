// 공연 상세 정보
export type ConcertDetail = {
  concertId: string;
  concertImageUrls: string[];
  description: string | null;
  endDate: string; // "YYYY-MM-DD"
  likeCount: number;
  maxPrice: number;
  minPrice: number;
  name: string;
  placeAddress: string;
  placeName: string;
  posterUrl: string;
  startDate: string; // "YYYY-MM-DD"
  ticketTime: string | null;
  ticketEndTime: string | null;
  viewCount: number;
  concertArtists: number[];
};

// 공연 상세 정보 아이템
export type ConcertInfoItem = {
  type: "date" | "location" | "price" | "ticketing";
  label: string;
  title: string;
  subtitle?: string;
};

// 공연장 정보
export type ConcertVenueInfo = {
  placeName: string;
  placeAddress: string;
  telephone: string;
  placeUrl: string;
  lat: number;
  lon: number;
  hasRestaurant: boolean;
  hasCafe: boolean;
  hasStore: boolean;
  hasPlayroom: boolean;
  hasNursingRoom: boolean;
  hasBarrierFreeParking: boolean;
  hasBarrierFreeRestRoom: boolean;
  hasBarrierFreeRamp: boolean;
  hasBarrierFreeElevator: boolean;
  hasParking: boolean;
};

// 티켓팅 플랫폼 정보
export interface TicketOffice {
  ticketOfficeName: string;
  ticketOfficeUrl: string;
}

// 공연 목록
export type ConcertData = {
  id: number;
  name: string;
  placeName: string;
  ticketTime?: string | null;
  ticketEndTime?: string | null;
  startDate: string;
  endDate: string;
  posterUrl: string;
  maxPrice?: number;
  minPrice?: number;
  viewCount?: number;
  likeCount?: number;
};

export type ConcertDataWithLiked = ConcertData & {
  isLiked?: boolean;
};

// sortSelect
// TODO : 위치 조정 필요
export type SortSelectProps = {
  onValueChange?: (value: string) => void;
  sortList?: {
    value: string;
    name: string;
  }[];
};

export type QuickActionsProps = {
  Icon1: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string;
  Icon2?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

// 찜한 공연인지 여부
export interface LikeConcert {
  isLike: boolean;
  concertId: string;
}
