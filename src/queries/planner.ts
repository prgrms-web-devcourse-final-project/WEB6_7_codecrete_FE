import {
  getPlanDetail,
  getPlanList,
  getPlanParticipants,
  getPlanShareLink,
} from "@/lib/api/planner/planner.client";

export const plannerQueryKeys = {
  all: ["planner"] as const,
  lists: () => [...plannerQueryKeys.all, "list"] as const,
  list: () => [...plannerQueryKeys.lists(), "default"] as const, // 이후 필터링이 추가되면 params를 받도록 변경
  details: () => [...plannerQueryKeys.all, "details"] as const, // 플랜 상세 정보
  detail: (planId: string) => [...plannerQueryKeys.details(), planId] as const,
  participants: (planId: string) =>
    [...plannerQueryKeys.details(), "participants", planId] as const, // 플랜 참여자 정보
  share: (planId: string) => [...plannerQueryKeys.details(), "share", planId] as const, // 플랜 공유 링크 정보
};

export const plannerQueries = {
  list: () => ({
    queryKey: plannerQueryKeys.list(),
    queryFn: () => getPlanList(),
    staleTime: 5 * 60 * 1000, // 5분
  }),
  detail: (planId: string) => ({
    queryKey: plannerQueryKeys.detail(planId),
    queryFn: () => getPlanDetail(planId),
    staleTime: 5 * 60 * 1000, // 5분
  }),
  participants: (planId: string) => ({
    queryKey: plannerQueryKeys.participants(planId),
    queryFn: () => getPlanParticipants(planId),
    staleTime: 5 * 60 * 1000, // 5분
  }),
  share: (planId: string) => ({
    queryKey: plannerQueryKeys.share(planId),
    queryFn: () => getPlanShareLink(planId),
    staleTime: 5 * 60 * 1000, // 5분
  }),
};
