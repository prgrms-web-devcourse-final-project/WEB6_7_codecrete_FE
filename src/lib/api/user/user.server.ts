import ServerApi from "@/utils/helpers/serverApi";

// TODO : 임시... 유저 타입 저장 필요
type User = {
  birthdate: Date | null;
  createdDate: Date;
  email: string;
  id: number;
  nickname: string;
  profileImageUrl: string;
  role: string;
  status: string;
};

// 현재 로그인 된 사용자 정보 조회
export const getUsersMe = async (): Promise<User> => {
  try {
    const res = await ServerApi("/api/v1/users/me", { method: "GET" });
    if (!res.ok) {
      throw new Error("사용자 정보를 불러오는데 실패했습니다.");
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};
