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
