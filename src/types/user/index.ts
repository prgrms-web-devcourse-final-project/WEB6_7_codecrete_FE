// 내 프로필
export interface User {
  id: number;
  email: string;
  nickname: string;
  birthdate?: string;
  createdDate: string;
  profileImageUrl?: string;
  status: string;
  role: string;
  socialType: string;
}

// 다른 사람 프로필
export interface OtherUser {
  id: number;
  nickname: string;
  profileImageUrl: string;
}

export interface UserInfo {
  id: number;
  nickname: string;
  profileImageUrl: string;
}
