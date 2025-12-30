import { Button } from "@/components/ui/button";

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

export type ScheduleType = "TRANSPORT" | "MEAL" | "WAITING" | "ACTIVITY" | "OTHER" | "CONCERT";

export type TransportType = "WALK" | "PUBLIC_TRANSPORT" | "CAR" | null;

export type ScheduleDetail = {
  id: number;
  scheduleType: ScheduleType;
  title: string;
  startAt: string;
  duration: number;
  location: string;
  locationLat: number;
  locationLon: number;
  estimatedCost: number;
  details: string;
  startPlaceLat: number | null;
  startPlaceLon: number | null;
  endPlaceLat: number | null;
  endPlaceLon: number | null;
  distance: number | null;
  transportType: TransportType;
  isMainEvent: boolean;
  concertId: number;
  concertName: string;
  concertPosterUrl: string;
  concertPlaceName: string;
  concertMinPrice: number;
  concertMaxPrice: number;
  createdDate: string;
  modifiedDate: string;
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
  coords?: { lat?: string; lng?: string };
};
