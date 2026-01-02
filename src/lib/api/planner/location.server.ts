import { UserPlace } from "@/types/planner";
import ServerApi from "@/utils/helpers/serverApi";

// 사용자 위치 조회
export const getMyLocation = async (): Promise<UserPlace | null> => {
  try {
    const res = await ServerApi(`/api/v1/location/my`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(`Server Error: ${res.status}`);
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("getMyLocation Error:", error);
    // null로 반환하여 위치 정보가 없음을 나타냄
    return null;
  }
};
