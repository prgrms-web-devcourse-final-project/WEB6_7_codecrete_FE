import {
  KakaoCarRouteGuide,
  KakaoMapSummary,
  TMapDetail,
  TMapSummary,
  TMapWalkSummary,
} from "@/types/planner";
import ClientApi from "@/utils/helpers/clientApi";

interface RouteCoords {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export const getTransitRouteSummaryByTmap = async ({
  startX,
  startY,
  endX,
  endY,
}: RouteCoords): Promise<TMapSummary> => {
  const res = await ClientApi(
    `/api/v1/location/tmap/summary?startX=${startX}&startY=${startY}&endX=${endX}&endY=${endY}`,
    {
      method: "GET",
    }
  );
  if (!res.ok) {
    throw new Error("Tmap 요약 경로 정보를 불러오는데 실패했습니다.");
  }
  const data = await res.json();
  return data;
};

export const getTransitRouteDetailsByTmap = async ({
  startX,
  startY,
  endX,
  endY,
}: RouteCoords): Promise<TMapDetail> => {
  try {
    const res = await ClientApi(
      `/api/v1/location/tmap/route?startX=${startX}&startY=${startY}&endX=${endX}&endY=${endY}`,
      {
        method: "GET",
      }
    );
    if (!res.ok) {
      throw new Error("Tmap 대중교통 경로 정보를 불러오는데 실패했습니다.");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Tmap 대중교통 경로 정보 불러오기 실패:", error);
    throw error;
  }
};

export const getWalkRouteByTmap = async ({
  startX,
  startY,
  endX,
  endY,
}: RouteCoords): Promise<TMapWalkSummary> => {
  const res = await ClientApi(
    `/api/v1/location/tmap/walk?startX=${startX}&startY=${startY}&endX=${endX}&endY=${endY}`,
    {
      method: "GET",
    }
  );
  if (!res.ok) {
    throw new Error("Tmap 도보 경로 정보를 불러오는데 실패했습니다.");
  }
  const data = await res.json();
  return data;
};

export const getTransitRouteByTmap = async ({ startX, startY, endX, endY }: RouteCoords) => {
  const res = await ClientApi(
    `/api/v1/location/tmap/transit?startX=${startX}&startY=${startY}&endX=${endX}&endY=${endY}`,
    {
      method: "GET",
    }
  );
  if (!res.ok) {
    throw new Error("Tmap 대중교통 경로 정보를 불러오는데 실패했습니다.");
  }
  const data = await res.json();
  return data;
};

export const getCarRouteByKakaoMap = async ({
  startX,
  startY,
  endX,
  endY,
}: RouteCoords): Promise<KakaoCarRouteGuide[]> => {
  const res = await ClientApi(
    `/api/v1/location/kakao/navigate/guides?startX=${startX}&startY=${startY}&endX=${endX}&endY=${endY}`,
    {
      method: "GET",
    }
  );
  if (!res.ok) {
    throw new Error("카카오 맵 자동차 경로 정보를 불러오는데 실패했습니다.");
  }
  const data = await res.json();
  return data;
};

export const getCarRouteSummaryByKakaoMap = async ({
  startX,
  startY,
  endX,
  endY,
}: RouteCoords): Promise<KakaoMapSummary> => {
  const res = await ClientApi(
    `/api/v1/location/kakao/navigate/summary?startX=${startX}&startY=${startY}&endX=${endX}&endY=${endY}`,
    {
      method: "GET",
    }
  );
  if (!res.ok) {
    throw new Error("카카오 맵 자동차 요약 경로 정보를 불러오는데 실패했습니다.");
  }
  const data = await res.json();
  return data;
};
