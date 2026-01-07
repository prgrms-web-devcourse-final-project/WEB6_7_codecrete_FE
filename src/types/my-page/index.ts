import { ConcertWithTicket as HomeConcertWithTicket } from "../home";
import { User } from "../user";

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

// 콘서트 리스트 컴포넌트 props 타입
export interface ConcertListProps {
  concerts: Concert[];
  schedules: UserSchedule[];
  selectedDate: Date;
}

// 게시글 페이지네이션 응답 타입들 (Spring 스타일)
export type PageSort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: PageSort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

// 공통 사용자 정보
export interface PostUser {
  id: number;
  nickname: string;
  profileImageUrl: string;
}

// 공통 게시글 정보
export interface PostBase {
  postId: number;
  userId: number;
  category: "REVIEW" | "JOIN";
  title: string;
  content: string;
  concertId: number;
  createdAt: string;
  rating: number | null;
  user: PostUser;
}

export interface PostDetailInfo {
  postId: number;
  userId: number;
  concertId: number;
  title: string;
  content: string;
  category: "REVIEW" | "JOIN";
  createdDate: string;
  modifiedDate: string;
}

// JOIN 상세 정보
export type JoinDetailData = {
  post: PostDetailInfo;
  maxParticipants: number;
  currentParticipants: number;
  genderPreference: "MALE" | "FEMALE" | "ANY" | string | null;
  ageRangeMin: number | null;
  ageRangeMax: number | null;
  meetingAt: string | null;
  meetingPlace: string;
  activityTags: string[];
  status: "OPEN" | "CLOSED" | "CANCELLED" | string;
};

export type JoinDetail = {
  status?: number;
  resultCode?: string;
  msg?: string;
  data: JoinDetailData;
};

// REVIEW 상세 정보
export type ReviewDetail = {
  post: PostDetailInfo;
  rating: number;
  imageUrls: string[];
  tags: string[];
};

export interface ReviewPostItem extends PostBase {
  category: "REVIEW";
  rating: number;
  detail?: ReviewDetail;
}

export interface JoinPostItem extends PostBase {
  category: "JOIN";
  detail?: JoinDetail;
}

// 마이페이지 게시글 항목 타입 (판별 유니온)
export type PostItemPage = ReviewPostItem | JoinPostItem;

// 마이페이지 게시글 페이지 응답 타입
export interface PostPageResponse {
  content: PostItemPage[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: PageSort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

// 마이페이지 댓글 항목 타입
export interface CommentItemPage {
  commentId: number;
  postId: number;
  postTitle: string;
  content: string;
  createdAt: string;
}

// 마이페이지 댓글 페이지 응답 타입
export interface CommentPageResponse {
  content: CommentItemPage[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: PageSort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface LikedPostItemPage {
  postId: number;
  userId: number;
  category: "REVIEW" | "JOIN";
  title: string;
  content: string;
  concertId: number;
  likedAt: string;
  user: User;
}

export interface LikedPostPageResponse {
  content: LikedPostItemPage[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: PageSort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
