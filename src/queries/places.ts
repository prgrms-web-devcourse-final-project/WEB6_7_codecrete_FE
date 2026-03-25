import {
  getNearbyCafes,
  getNearbyRestaurants,
  searchPlaceByKeyword,
} from "@/lib/api/planner/location.client";
import { NearbyPlaces, SearchPlace } from "@/types/planner";

function toSearchPlace(place: NearbyPlaces): SearchPlace {
  return {
    ...place,
    category_group_code: "",
    category_group_name: "",
    category_name: "",
    distance: "",
    id: "",
    phone: "",
  };
}

export const placeQueryKeys = {
  all: ["places"] as const,
  search: (keyword: string) => [...placeQueryKeys.all, "search", keyword] as const,
  nearby: (coords: { lat: number; lon: number } | null, scheduleType?: string) =>
    coords
      ? ([...placeQueryKeys.all, "nearby", coords.lat, coords.lon, scheduleType] as const)
      : ([...placeQueryKeys.all, "nearby", "null", "null", scheduleType] as const),
};

export const placeQueries = {
  search: (keyword: string) => ({
    queryKey: placeQueryKeys.search(keyword),
    queryFn: () => searchPlaceByKeyword(keyword),
    staleTime: 1000 * 60 * 5,
    retry: false,
  }),
  nearby: (coords: { lat: number; lon: number } | null, scheduleType?: string) => ({
    queryKey: placeQueryKeys.nearby(coords, scheduleType),
    queryFn: async () => {
      // 타입 안전성을 위한 유효성 체크
      if (!coords || !scheduleType) return [];

      if (scheduleType === "WAITING") {
        const data = await getNearbyCafes(coords.lon, coords.lat);
        return (data ?? []).map(toSearchPlace);
      }
      if (scheduleType === "MEAL") {
        const data = await getNearbyRestaurants(coords.lon, coords.lat);
        return (data ?? []).map(toSearchPlace);
      }
      return [];
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  }),
};
