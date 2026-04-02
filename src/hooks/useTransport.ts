import { getWalkRouteByTmap } from "@/lib/api/planner/transport.client";
import { transportQueries } from "@/queries/transport";
import { Coords, TMapSummary } from "@/types/planner";
import { skipToken, useQuery } from "@tanstack/react-query";

export function useCarRoute(coords: Coords | null) {
  return useQuery(transportQueries.car(coords));
}

export function useTransitRoute(coords: Coords | null) {
  return useQuery(transportQueries.transit(coords));
}

export function useWalkRoute(coords: Coords | null, straightDistance: number = 0) {
  return useQuery({
    ...transportQueries.walk(coords),
    queryFn: coords
      ? async () => {
          try {
            const walk = await getWalkRouteByTmap(coords);
            return buildWalkSummary(walk.totalTime, walk.totalDistance, coords);
          } catch {
            const estimatedDistance = Math.round(straightDistance * 1.3);
            const estimatedTime = Math.round((estimatedDistance / 67) * 60);
            return buildWalkSummary(estimatedTime, estimatedDistance, coords);
          }
        }
      : skipToken,
  });
}

function buildWalkSummary(totalTime: number, totalDistance: number, coords: Coords): TMapSummary {
  return {
    metaData: {
      plan: {
        itineraries: [
          {
            totalTime,
            totalDistance,
            transferCount: 0,
            fare: {
              regular: {
                totalFare: 0,
                currency: { symbol: "￦", currency: "원", currencyCode: "KRW" },
              },
            },
            pathType: 5,
          },
        ],
      },
      requestParameters: { reqDttm: "", ...coords },
    },
  };
}
