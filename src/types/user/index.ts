export interface User {
  id: number;
  email: string;
  nickname: string;
  birthdate?: string;
  profileImageUrl?: string;
  status: string;
  role: string;
}
