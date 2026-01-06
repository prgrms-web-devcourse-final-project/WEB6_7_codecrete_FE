export type ApiResponse<T> = {
  status: number;
  resultCode: string;
  msg: string;
  data: T;
};

export type PhotoUploadSectionProps = {
  images: File[];
  onChangeImages: (files: File[]) => void;
};

export type ReviewPostWrite = {
  concertId: number;
  title: string;
  rating: number;
  content: string;
  images?: File[];
  activityTags: string[];
};

export type ReviewDetailResponse = ApiResponse<ReviewDetailData>;

export type ReviewPost = {
  postId: number;
  userId: number;
  concertId: number;
  title: string;
  content: string;
  category: "REVIEW" | "JOIN";
  createdDate: string;
  modifiedDate: string;
};

export type ReviewDetailData = {
  post: ReviewPost;
  rating: number;
  imageUrls: string[];
};
