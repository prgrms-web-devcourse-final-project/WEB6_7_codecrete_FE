export interface PostListResponse {
  content: Post[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
}

export interface Post {
  postId: number;
  userId: number;
  concertId: number;
  title: string;
  content: string;
  category: string;
  createdDate: string;
  modifiedDate: string;
}

export type CommunityCategory = "NOTICE" | "REVIEW" | "JOIN" | "TRADE" | "PHOTO";

export interface PostSubmitProps {
  onSubmit: () => void | Promise<void>;
  onCancel: () => void;
  isPending?: boolean;
  isDisabled?: boolean;
  buttonText?: string;
}

export type PostConfirmSectionProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export interface CreateCommentRequest {
  content: string;
}

export interface CommentResponse {
  content: string[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
}
