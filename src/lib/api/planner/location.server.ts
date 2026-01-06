import { UserPlace } from "@/types/planner";
import ServerApi from "@/utils/helpers/serverApi";

// 사용자 위치 조회
export const getMyLocation = async (): Promise<UserPlace | null> => {
  const res = await ServerApi(`/api/v1/location/my`, {
    method: "GET",
  });
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  return data.data;
};
