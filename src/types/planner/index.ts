import { Button } from "@/components/ui/button";
import { ConcertDetail } from "../concerts";

export type ButtonProps = React.ComponentProps<"button"> & React.ComponentProps<typeof Button>;

export type PlanParticipants = {
  id: number;
  userId: number;
  inviteStatus: "JOINED" | "PENDING" | "DECLINED";
  role: "OWNER" | "MEMBER";
};

export type PlanDetail = {
  id: number;
  concertId: number;
  createdBy: number;
  title: string;
  planDate: string;
  createdDate: string;
  modifiedDate: string;
  participants: PlanParticipants[];
  schedules: ScheduleDetail[];
  totalDuration: number;
};

export type ScheduleType = "TRANSPORT" | "MEAL" | "WAITING" | "ACTIVITY" | "OTHER";

export type TransportType = "WALK" | "PUBLIC_TRANSPORT" | "CAR" | null;

export type ScheduleDetail = {
  id?: number; // planId가 아닌 scheduleId
  scheduleType: ScheduleType;
  title: string;
  startAt: string;
  duration: number;
  location: string;
  estimatedCost: number;
  details: string;
  locationLat?: number;
  locationLon?: number;
  startPlaceLat?: number | null;
  startPlaceLon?: number | null;
  endPlaceLat?: number | null;
  endPlaceLon?: number | null;
  distance?: number | null;
  transportType?: TransportType;
  isMainEvent?: boolean;
  concertId?: number;
  concertName?: string;
  concertPosterUrl?: string;
  concertPlaceName?: string;
  concertMinPrice?: number;
  concertMaxPrice?: number;
  createdDate?: string;
  modifiedDate?: string;
};

export type ScheduleLocationProps = {
  place_name: string;
  address_name: string;
  x?: string; // 경도
  y?: string; // 위도
};

export type ScheduleFormData = {
  title: string;
  type: ScheduleType;
  time: string;
  duration: string;
  location: string;
  notes: string;
  coords?: { lat?: string; lon?: string };
};

export type PlannerListWithDetails = {
  concertId: number;
  createdBy: number;
  createdDate: string;
  id: number;
  modifiedDate: string;
  planDate: string;
  scheduleCount: number;
  title: string;
  totalDuration: number;
  concertDetail: ConcertDetail;
  planDetail: PlanDetail;
};

export type UserPlace = {
  lat: number;
  lon: number;
  address: string;
  placeName?: string;
};

export type SearchPlace = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: number;
  y: number;
};

export type TMapSummary = {
  metaData: {
    plan: {
      itineraries: [
        {
          pathType: number;
          totalTime: number;
          transferCount: number;
          totalWalkDistance: number;
          totalDistance: number;
          totalWalkTime: number;
          fare: {
            regular: {
              currency: {
                symbol: "￦";
                currency: "원";
                currencyCode: "KRW";
              };
              totalFare: number;
            };
          };
        },
      ];
    };
    requestParameters: {
      reqDttm: string;
      startX: string;
      startY: string;
      endX: string;
      endY: string;
    };
  };
};

export type KakaoMapSummary = {
  distance: number;
  duration: number;
};

export type KakaoCarRouteGuide = {
  /** 지점 이름 (예: "교보타워사거리", "출발지", "목적지") */
  name: string;

  /** 경도 (Longitude) */
  x: number;

  /** 위도 (Latitude) */
  y: number;

  /** 이전 지점부터의 거리 (단위: m) */
  distance: number;

  /** 이전 지점부터 소요 시간 (단위: 초) */
  duration: number;

  /** 안내 타입 코드 (100: 출발, 101: 도착, 1~: 회전 안내 등) */
  type: number;

  /** 안내 문구 (예: "코엑스 방면으로 우회전") */
  guidance: string;

  /** 도로 인덱스 (-1은 목적지) */
  road_index: number;
};

// 주변 장소 검색 API 응답 타입 (음식점 기준)
export type NearbyPlaces = {
  place_name: string;
  x: number;
  y: number;
  road_address_name: string;
  address_name: string;
  place_url: string;
};

// 콘서트 장소 좌표 타입
export type ConcertCoords = { lat?: number; lon?: number };
