"use client";

import {
  CoffeeIcon,
  LoaderCircleIcon,
  MapIcon,
  MapPinIcon,
  MapPinnedIcon,
  UtensilsIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // shadcn Button 추가
import { toast } from "sonner";
import { ConcertCoords, NearbyPlaces, ScheduleType, SearchPlace } from "@/types/planner";
import { getNearbyCafes, getNearbyRestaurants } from "@/lib/api/planner/location.client";
import { calculateDistance } from "@/utils/helpers/geolocation";
import { formatDistance } from "@/utils/helpers/formatters";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchPlacesProps {
  placeholder?: string;
  onSelect?: (place: SearchPlace) => void;
  isStart?: boolean;
  defaultValue?: string;
  defaultCoords?: ConcertCoords;
  scheduleType?: ScheduleType;
}

export default function SearchPlaces({
  placeholder = "장소 또는 주소를 검색하세요",
  onSelect,
  isStart,
  defaultValue,
  defaultCoords,
  scheduleType,
}: SearchPlacesProps) {
  const [term, setTerm] = useState(defaultValue || "");
  const [results, setResults] = useState<SearchPlace[] | NearbyPlaces[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecommendation, setIsRecommendation] = useState(false);
  const id = useId();
  const nearbyCacheRef = useRef<Record<string, NearbyPlaces[]>>({});

  const debouncedTerm = useDebounce(term, 500);

  // 검색어 지우기 핸들러
  const handleClear = () => {
    setTerm("");
    // 지웠을 때 다시 추천 리스트가 뜨도록 하려면 여기서 초기화하거나,
    // useEffect가 debouncedTerm 변경을 감지해서 알아서 처리하게 둠
  };

  useEffect(() => {
    const run = async () => {
      setIsLoading(true);
      try {
        if (debouncedTerm.trim()) {
          setIsRecommendation(false);
          const res = await fetch(`/api/location?query=${encodeURIComponent(debouncedTerm)}`);
          if (!res.ok) throw new Error("검색 요청 실패");
          const data = await res.json();
          setResults(data?.documents ?? []);
        } else if (defaultCoords) {
          setIsRecommendation(true);

          // 주변 장소 추천 로직 : 콘서트 좌표 있으면 근처 맛집/카페 추천
          if (!defaultCoords || !defaultCoords.lat || !defaultCoords.lon) {
            setResults([]);
            setIsLoading(false);
            return;
          }

          // 무의미한 재호출을 막기 위해서 캐시 저장
          const cacheKey = `${scheduleType || "MEAL"}-${defaultCoords.lat}-${defaultCoords.lon}`;
          const cached = nearbyCacheRef.current[cacheKey];

          // 캐시된 데이터가 있으면 사용하기
          if (cached) {
            setResults(cached);
            setIsLoading(false);
            return;
          }

          let data = null;

          // 스케줄 타입에 따라 맛집 또는 카페 추천
          if (scheduleType === "WAITING") {
            data = await getNearbyCafes(defaultCoords.lon, defaultCoords.lat);
          }
          if (scheduleType === "MEAL") {
            data = await getNearbyRestaurants(defaultCoords.lon, defaultCoords.lat);
          }

          setResults(data || []);

          // 캐시에 저장
          if (cacheKey) {
            nearbyCacheRef.current[cacheKey] = data || [];
          }
        } else {
          setResults([]);
        }
      } catch (error) {
        if (debouncedTerm.trim()) {
          if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error("장소 검색에 실패했습니다.");
          }
        }
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };
    run();
  }, [debouncedTerm, defaultCoords, scheduleType]);

  return (
    <div className="flex h-full flex-col gap-3">
      {/* 검색창 영역 */}
      <div className="relative">
        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
          <MapPinIcon className="stroke-text-sub size-4" />
          <span className="sr-only">Search</span>
        </div>

        {/* 검색 인풋 */}
        <Input
          id={id}
          type="text"
          placeholder={placeholder}
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="peer px-8 focus-visible:ring-0"
        />

        {/* 검색어 삭제 */}
        {term && !isLoading && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleClear}
            className="hover:text-muted-foreground absolute top-1/2 right-1 -translate-y-1/2 hover:bg-transparent"
            type="button"
          >
            <XIcon className="size-4" />
          </Button>
        )}

        {isLoading && (
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 peer-disabled:opacity-50">
            <LoaderCircleIcon className="size-4 animate-spin" />
          </div>
        )}
      </div>

      {/* 초기 상태 안내 */}
      {isStart && results.length === 0 && !defaultCoords && !term && (
        <div className="flex flex-1 grow flex-col items-center justify-center gap-4 py-10">
          <div className="bg-bg-sub rounded-full p-5">
            <MapIcon className="size-10" />
          </div>
          <div className="space-y-1 text-center">
            <p className="text-lg font-medium">검색어를 입력해주세요.</p>
            <p className="text-text-sub text-sm">출발하고 싶은 장소를 검색해보세요.</p>
          </div>
        </div>
      )}

      {/* 추천 리스트 라벨 */}
      {/* 스케줄 타입이 "MEAL"일 때 */}
      {isRecommendation && results.length > 0 && (
        <div className="text-text-sub flex items-center gap-1.5 px-1 pt-1 text-xs font-medium">
          {scheduleType === "MEAL" && (
            <>
              <UtensilsIcon className="size-3" />
              <span>공연장 주변 맛집</span>
            </>
          )}
          {/* 스케줄 타입이 "WAITING"일 때 */}
          {scheduleType === "WAITING" && (
            <>
              <CoffeeIcon className="size-3" />
              <span>공연장 주변 카페</span>
            </>
          )}
        </div>
      )}

      {/* 결과 리스트 */}
      {results.length > 0 && (
        <div className={cn("max-h-[60vh] space-y-3 overflow-y-auto", defaultCoords && "max-h-46")}>
          <ul className="space-y-2">
            {results.map((place) => {
              const placeLat = Number(place.y);
              const placeLon = Number(place.x);

              const distance =
                defaultCoords && defaultCoords.lat && defaultCoords.lon
                  ? calculateDistance(defaultCoords.lat, defaultCoords.lon, placeLat, placeLon)
                  : 0;

              const itemKey = `${place.x}-${place.y}-${place.place_name}`;

              return (
                <li
                  key={itemKey}
                  className="hover:bg-muted group flex cursor-pointer items-start gap-3 rounded-md p-2 transition-colors"
                  onClick={() => {
                    setTerm(place.place_name);
                    onSelect?.(place as SearchPlace);
                  }}
                >
                  <div className="bg-muted flex size-10 items-center justify-center rounded-full">
                    {isRecommendation ? (
                      scheduleType === "WAITING" ? (
                        <CoffeeIcon className="stroke-text-sub group-hover:text-foreground size-4 shrink-0 transition-colors" />
                      ) : (
                        <UtensilsIcon className="stroke-text-sub group-hover:text-foreground size-4 shrink-0 transition-colors" />
                      )
                    ) : (
                      <MapPinnedIcon className="stroke-text-sub group-hover:text-foreground size-4 shrink-0 transition-colors" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1 space-y-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <strong className="text-text-main truncate text-sm font-medium">
                        {place.place_name}
                      </strong>

                      {defaultCoords && (
                        <span className="text-muted-foreground group-hover:text-primary shrink-0 text-xs font-medium transition-colors">
                          {formatDistance(distance)}
                        </span>
                      )}
                    </div>

                    <p className="text-text-sub truncate text-xs">
                      {place.road_address_name || place.address_name}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
