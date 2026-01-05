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

// 폼 내부에서 날짜 제한용으로만 사용
export interface MatePostForm extends MatePostWrite {
  concertEndDate?: string;
}
