import { ResponseData } from "@/types/api";
import { NearbyPlaces, UserPlace } from "@/types/planner";
import ClientApi from "@/utils/helpers/clientApi";

/**
 * 사용자의 위치를 저장합니다.
 *
 * @param {number} lat - 위도
 * @param {number} lon - 경도
 * @returns {Promise<ResponseData<UserPlace | null>>} 저장된 위치 데이터
 */
export const saveMyLocation = async ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}): Promise<ResponseData<UserPlace | null>> => {
  const payload = {
    lat,
    lon,
  };

  try {
    const res = await ClientApi("/api/v1/location/my", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Server Error: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("saveMyLocation Error:", error);
    throw error;
  }
};

/**
 * 사용자의 위치를 수정합니다.
 *
 * @param {number} lat - 위도
 * @param {number} lon - 경도
 * @returns {Promise<ResponseData<UserPlace | null>>} 수정된 위치 데이터
 */
export const updateMyLocation = async ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}): Promise<ResponseData<UserPlace | null>> => {
  const payload = {
    lat,
    lon,
  };

  try {
    const res = await ClientApi("/api/v1/location/my", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Server Error: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("updateMyLocation Error:", error);
    throw error;
  }
};

/**
 * 등록한 내 위치를 삭제합니다.
 *
 * @returns {Promise<void>}
 */
export const deleteMyLocation = async (): Promise<void> => {
  try {
    const res = await ClientApi("/api/v1/location/my", {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`Server Error: ${res.status}`);
    }
  } catch (error) {
    console.error("deleteMyLocation Error:", error);
    throw error;
  }
};

/**
 * 키워드로 장소를 검색합니다.
 * @param {string} query - 검색 키워드
 * @returns {Promise<any[]>} 검색된 장소 목록
 */
export const searchPlaceByKeyword = async (query: string) => {
  const res = await fetch(`/api/location?query=${encodeURIComponent(query)}`);

  if (!res.ok) throw new Error("장소 검색 실패");
  const json = await res.json();

  // 카카오 검색 결과(documents) 반환
  return json.documents;
};

/**
 * 좌표(위도, 경도)로부터 주소를 조회합니다.
 *
 * @param {number} lat - 위도
 * @param {number} lon - 경도
 * @returns {Promise<string>} 주소 문자열
 */
export const getAddressFromCoordsKakao = async (lat: number, lon: number): Promise<string> => {
  try {
    const res = await ClientApi(`/api/v1/location/kakao/coord2address?lat=${lat}&lon=${lon}`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(`Server Error: ${res.status}`);
    }
    const data = await res.json();
    return data.data || "주소 정보 없음";
  } catch (error) {
    console.error("getAddressFromCoordsKakao Error:", error);
    throw error;
  }
};

/**
 * 주변 음식점을 조회합니다.
 * @param {number} lat - 위도
 * @param {number} lon - 경도
 * @returns {Promise<any[]>} 주변 음식점 목록
 */
export const getNearbyRestaurants = async (lat: number, lon: number): Promise<NearbyPlaces[]> => {
  try {
    const res = await ClientApi(`/api/v1/location/kakao/restaurant?lat=${lat}&lon=${lon}`, {
      method: "POST",
    });
    if (!res.ok) {
      throw new Error(`Server Error: ${res.status}`);
    }
    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("getNearbyRestaurants Error:", error);
    throw error;
  }
};
/**
 * 주변 카페를 조회합니다.
 * @param {number} lat - 위도
 * @param {number} lon - 경도
 * @returns {Promise<any[]>} 주변 음식점 목록
 */
export const getNearbyCafes = async (lat: number, lon: number): Promise<NearbyPlaces[]> => {
  try {
    const res = await ClientApi(`/api/v1/location/kakao/cafes?lat=${lat}&lon=${lon}`, {
      method: "POST",
    });
    if (!res.ok) {
      throw new Error(`Server Error: ${res.status}`);
    }
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("getNearbyRestaurants Error:", error);
    throw error;
  }
};
