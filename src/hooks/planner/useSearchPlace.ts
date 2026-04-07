import { ConcertCoords, ScheduleType } from "@/types/planner";
import { useQuery } from "@tanstack/react-query";
import { placeQueries } from "@/queries/places";

export function useSearchPlace(
  debouncedTerm: string,
  defaultCoords?: ConcertCoords,
  scheduleType?: ScheduleType
) {
  const stableCoords =
    defaultCoords?.lat && defaultCoords?.lon
      ? { lat: defaultCoords.lat, lon: defaultCoords.lon }
      : null;

  // 검색어가 입력되어 있으면 검색 모드
  const isSearchMode = !!debouncedTerm.trim();
  // 검색어가 없고, 좌표가 있으면 주변 장소 추천 모드 (최대 10개의 결과목록 보여줌)
  const isNearbyMode = !isSearchMode && !!stableCoords;

  const searchQuery = useQuery({
    ...placeQueries.search(debouncedTerm),
    enabled: isSearchMode,
  });
  const nearbyQuery = useQuery({
    ...placeQueries.nearby(stableCoords, scheduleType),
    enabled: isNearbyMode,
  });

  const activeQuery = isSearchMode ? searchQuery : nearbyQuery;
  return {
    results: activeQuery.data ?? [],
    isLoading: activeQuery.isLoading || activeQuery.isFetching,
    isRecommendation: isNearbyMode,
    stableCoords,
  };
}
