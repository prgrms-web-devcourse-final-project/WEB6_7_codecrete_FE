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
}

// 콘서트 리스트 컴포넌트 props 타입
export interface ConcertListProps {
  concerts: Concert[];
  schedules: UserSchedule[];
  selectedDate: Date;
}

// 유저 프로필
export type UserData = {
  id: number;
  email: string;
  nickname: string;
  birthdate: string | null;
  profileImageUrl?: string;
  status: string;
  role: string;
};
