import { Button } from "@/components/ui/button";
import { ConcertDetail } from "../concerts";

export type ButtonProps = React.ComponentProps<"button"> & React.ComponentProps<typeof Button>;

export type PlanParticipants = {
  id: number;
  userId: number;
  inviteStatus: "JOINED" | "PENDING" | "DECLINED";
  role: PlannerParticipantRole;
};

export type PlanList = {
  id: number;
  concertId: number;
  createdBy: number;
  title: string;
  planDate: string;
  createdDate: string;
  modifiedDate: string;
  scheduleCount: number;
  totalDuration: number;
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

export type TransportType = "WALK" | "PUBLIC_TRANSPORT" | "CAR";

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
  transportRoute?: {
    totalTime: number;
    totalDistance: number;
    totalWalkTime: number;
    totalWalkDistance: number;
    transferCount: number;
    leg: Leg[];
    fare: {
      taxi?: number;
    };
  };
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
  participants: PlannerParticipant[];
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

// ====== TMAP 대중교통 타입 =====

/** TMAP 경로탐색 결과의 pathType 숫자 매핑
 * 1-지하철, 2-버스, 3-버스+지하철
 * 4-고속/시외버스, 5-기차, 6-항공, 7-해운 */
export enum TMapPathType {
  SUBWAY = 1,
  BUS = 2,
  BUS_SUBWAY = 3,
  EXPRESS_BUS = 4,
  TRAIN = 5,
  AIRPLANE = 6,
  SHIP = 7,
}

// 1. 최상위 응답 객체 (Summary 포함 전체 구조)
export interface TMapDetail {
  metaData?: {
    requestParameters: {
      busCount: number;
      expressbusCount: number;
      subwayCount: number;
      airplaneCount: number;
      locale: string;
      endY: string;
      endX: string;
      wideareaRouteCount: number;
      subwayBusCount: number;
      startY: string;
      startX: string;
      ferryCount: number;
      trainCount: number;
      reqDttm: string;
    };
    plan: {
      itineraries: Itinerary[];
    };
  } | null;
}

// 2. 경로 (Itinerary) - 추천 경로 하나하나
export interface Itinerary {
  totalTime: number; // 총 소요 시간 (초)
  totalDistance: number; // 총 거리 (m)
  totalWalkTime?: number; // 총 도보 시간 (초)
  totalWalkDistance?: number; // 총 도보 거리 (m)
  transferCount: number; // 환승 횟수
  pathType: number; // 경로 타입 (1: 지하철, 2: 버스, 3: 지하철+버스)
  fare: {
    regular: {
      totalFare: number; // 총 요금
      currency: {
        symbol: string;
        currency: string;
        currencyCode: string;
      };
    };
  };
  legs?: Leg[]; // 상세 이동 구간 리스트
}

// 3. 이동 구간 (Leg) - 도보, 버스, 지하철 등
export interface Leg {
  mode: "WALK" | "BUS" | "SUBWAY" | "EXPRESSBUS" | "TRAIN" | "AIRPLANE" | "FERRY"; // 이동 수단
  sectionTime: number; // 해당 구간 소요 시간 (초)
  distance: number; // 해당 구간 거리 (m)
  start: LocationPoint; // 구간 시작점
  end: LocationPoint; // 구간 도착점

  // -- 도보(WALK)일 때만 존재 --
  steps?: Step[];

  // -- 대중교통(BUS, SUBWAY 등)일 때만 존재 --
  route?: string; // 노선명 (예: "간선:472", "지하철 2호선")
  routeId?: string; // 노선 ID
  routeColor?: string; // 노선 색상 (Hex 코드)
  service?: number; // 운행 정보
  type?: number; // 노선 타입
  passStopList?: {
    // 경유 정류장 리스트
    stations: Station[];
  };
  passShape?: {
    // 경로 선형 (지도 그리기용)
    linestring: string; // "lon,lat lon,lat ..." 형태의 문자열
  };
  Lane?: Array<{
    // 버스 노선 옵션들 (여러 노선 선택 가능)
    routeColor?: string;
    route?: string;
    routeId?: string;
    service?: number;
    type?: number;
  }>;
}

// 4. 위치 좌표 객체 (TMAP 내부용)
export interface LocationPoint {
  name: string;
  lon: number;
  lat: number;
}

// 5. 도보 상세 경로 (Step)
export interface Step {
  streetName: string; // 도로명
  distance: number; // 거리 (m)
  description: string; // 이동 설명
  linestring: string; // 경로 좌표 문자열
}

// 6. 정류장/역 정보 (Station)
export interface Station {
  index: number;
  stationName: string;
  lon: string; // 주의: API가 좌표를 string으로 줄 때가 있음
  lat: string;
  stationID: string;
}

// 7. 요약 정보용
export type TMapSummary = {
  metaData?: {
    plan: {
      itineraries: Itinerary[];
    };
    requestParameters: {
      reqDttm: string;
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    };
  } | null;
};

// ====== KakaoMap 타입 ======
export type KakaoMapSummary = {
  distance: number;
  duration: number;
  fare?: {
    taxi?: number;
  };
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
export type ConcertCoords = { lon: number; lat: number };

// 플래너 링크
export type PlannerShareLink = {
  domain: string;
  url: string;
  status: string;
};

export type PlannerParticipantRole = "OWNER" | "EDITOR" | "VIEWER" | null;

export type PlannerParticipantInviteStatus =
  | "JOINED"
  | "PENDING"
  | "ACCEPTED"
  | "DECLINED"
  | "LEFT"
  | "REMOVED";

export type PlannerParticipant = {
  participantId: string;
  userId: number;
  nickname: string;
  email: string;
  profileImage: string;
  inviteStatus: PlannerParticipantInviteStatus;
  role: PlannerParticipantRole;
};

// 도보 이동 경로 요약 타입
export type TMapWalkRoute = {
  totalTime: number;
  totalDistance: number;
};
