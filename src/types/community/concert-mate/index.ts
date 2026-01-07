import { ConcertDetail } from "@/types/concerts";
import { UserInfo } from "@/types/user";
import { Post } from "..";

export type MatePostWrite = {
  concertId: number;
  title: string;
  content: string;
  maxParticipants: number;
  genderPreference: string;
  ageRangeMin: number;
  ageRangeMax: number;
  meetingAt: string;
  meetingPlace: string;
  activityTags: string[];
};

export type MateDetailData = {
  post: MateDetailDataPost;
  maxParticipants: number;
  currentParticipants: number;
  genderPreference: string | null;
  ageRangeMin: number | null;
  ageRangeMax: number | null;
  meetingAt: string | null;
  meetingPlace: string | null;
  activityTags: string[] | null;
  status: string;
};

export type MateDetailDataPost = {
  postId: number;
  userId: number;
  concertId: number;
  title: string;
  content: string;
  category: "REVIEW" | "JOIN";
  createdDate: string;
  modifiedDate: string;
};

export type MateDetailMainProps = {
  postId: string;
  res: MateDetailData;
  concertDetail: ConcertDetail;
  userDetail: UserInfo;
  isAuthor: boolean;
  isLiked: boolean;
};

export type MeetingPostBodyProps = {
  postDetail: MateDetailDataPost;
  initialIsLiked: boolean;
  isOpen: boolean;
};

export type MeetingPostSidebarProps = {
  showMeetingDetail: boolean;
  userDetail: UserInfo;
  res: MateDetailData;
};

export type MeetingPostHeaderProps = {
  postDetail: MateDetailDataPost;
  isAuthor: boolean;
  isOpen: boolean;
};

export type MateListCardProps = {
  post: Post;
  user?: UserInfo | null;
  concert?: ConcertDetail | null;
  likeCount?: string;
  commentCount?: number;
};

export type MateListBtnProps = { postId: number; likeCount?: string; commentCount?: number };

export type MateEditMainProps = {
  concertId: number;
  postId: number;
  postDetail: MateDetailData;
};
