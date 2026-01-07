import { ConcertWithTicket as HomeConcertWithTicket } from "../home";

// 마이페이지에서 사용할 콘서트 타입 (찜한 공연과 아티스트 공연 구분)
export type ConcertWithTicket = HomeConcertWithTicket & {
  isLikedArtistConcert?: boolean;
};

// 콘서트 타입
export interface Concert {
  id: string;
  artist: string;
  title: string;
  venue: string;
  location: string;
  date: string; // ISO format (YYYY-MM-DD)
  time: string;
  priceRange: string;
  posterUrl?: string;
}

// 사용자 일정 타입
export interface UserSchedule {
  id: string;
  concertId: string;
  concertTitle: string;
  artist: string;
  date: string; // ISO format (YYYY-MM-DD)
  time: string;
  venue: string;
  location: string;
  goingWith: string[];
  daysUntil: number;
}

// 이벤트 컨텍스트 타입
export interface EventContextType {
  events: Record<string, number>;
  schedules: Record<string, number>;
  onDateClick?: (date: Date) => void;
  concertsByDate?: Record<string, ConcertWithTicket[]>;
}

// 찜한 아티스트
export interface LikedArtist {
  artistName: string;
  id: number;
  imageUrl: string;
  nameKo: string;
  isLiked: boolean;
}

// 찜한 아티스트의 공연 정보 포함 타입
export interface LikedArtistWithConcerts extends LikedArtist {
  concerts: ConcertWithTicket[];
}
