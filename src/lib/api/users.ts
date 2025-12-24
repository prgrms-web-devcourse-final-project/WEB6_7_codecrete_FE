import ClientApi from "@/utils/helpers/clientApi";

/**
 * 이메일 알림 및 다크모드 설정 정보 가져오기
 */
export const getUsersSettings = async () => {
  try {
    const res = await ClientApi(`/api/v1/users/settings`, {
      method: "GET",
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      return null;
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching users detail:", error);
    return null;
  }
};
