export type ReviewPostWrite = {
  concertId: number;
  title: string;
  rating: number;
  content: string;
  images?: File[];
  activityTags: string[];
};

export type PhotoUploadSectionProps = {
  images: File[];
  onChangeImages: (files: File[]) => void;
};
