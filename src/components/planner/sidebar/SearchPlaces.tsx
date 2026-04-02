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
import { useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ConcertCoords, ScheduleType, SearchPlace } from "@/types/planner";
import { calculateDistance } from "@/utils/helpers/geolocation";
import { formatDistance } from "@/utils/helpers/formatters";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchPlace } from "@/hooks/useSearchPlace";

interface SearchPlacesProps {
  placeholder?: string;
  onSelect?: (place: SearchPlace) => void;
  isStart?: boolean;
  defaultValue?: string;
  defaultCoords?: ConcertCoords;
  scheduleType?: ScheduleType;
  ref?: React.Ref<HTMLInputElement>;
}

type EmptyState = "idle" | "searching" | "no_results";

export default function SearchPlaces({
  placeholder = "장소 또는 주소를 검색하세요",
  onSelect,
  isStart,
  defaultValue,
  defaultCoords,
  scheduleType,
  ref,
}: SearchPlacesProps) {
  const [term, setTerm] = useState(defaultValue ?? "");
  const id = useId(); // input 요소에 고유한 id 생성

  const debouncedTerm = useDebounce(term, 500);

  const { results, isLoading, isRecommendation, stableCoords } = useSearchPlace(
    debouncedTerm,
    defaultCoords,
    scheduleType
  );

  const emptyState: EmptyState | null = (() => {
    if (!isStart || results.length > 0 || defaultCoords) return null;
    if (!debouncedTerm) return "idle";
    if (isLoading) return "searching";
    return "no_results";
  })();

  const emptyStateConfig: Record<EmptyState, { title: string; description: string }> = {
    idle: {
      title: "검색어를 입력해주세요.",
      description: "출발하고 싶은 장소를 검색해보세요.",
    },
    searching: {
      title: "검색 중...",
      description: `"${debouncedTerm}"에 대해 검색중이에요.\n잠시만 기다려주세요.`,
    },
    no_results: {
      title: "검색 결과가 없어요.",
      description: `"${debouncedTerm}"에 대한 검색 결과가 없습니다. 다른 키워드로 시도해보세요.`,
    },
  };

  return (
    <div className="flex h-full flex-col gap-3">
      {/* 검색창 */}
      <div className="relative">
        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
          <MapPinIcon className="stroke-text-sub size-4" />
          <span className="sr-only">Search</span>
        </div>
        <Input
          ref={ref}
          id={id}
          type="text"
          placeholder={placeholder}
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="peer px-8 focus-visible:ring-0"
          name="searchPlace"
        />
        {term && !isLoading && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setTerm("")}
            className="hover:text-muted-foreground absolute top-1/2 right-1 -translate-y-1/2 hover:bg-transparent"
            type="button"
          >
            <XIcon className="size-4" />
          </Button>
        )}
        {isLoading && (
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3">
            <LoaderCircleIcon className="size-4 animate-spin" />
          </div>
        )}
      </div>

      {/* 초기 상태 안내 */}
      {emptyState && (
        <div className="flex flex-1 grow flex-col items-center justify-center gap-6 py-10">
          <div className="bg-bg-sub rounded-full p-5">
            <MapIcon className="size-10" />
          </div>
          <div className="space-y-1 text-center">
            <p className="text-base font-medium">{emptyStateConfig[emptyState].title}</p>
            <p className="text-text-sub text-xs leading-normal whitespace-pre-line lg:text-sm">
              {emptyStateConfig[emptyState].description}
            </p>
          </div>
        </div>
      )}

      {/* 추천 라벨 */}
      {isRecommendation && results.length > 0 && (
        <div className="text-text-sub flex items-center gap-1.5 px-1 pt-1 text-xs font-medium">
          {scheduleType === "MEAL" && (
            <>
              <UtensilsIcon className="size-3" />
              <span>공연장 주변 맛집</span>
            </>
          )}
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
            {results.map((place: SearchPlace) => {
              const distance = stableCoords
                ? calculateDistance(
                    stableCoords.lat,
                    stableCoords.lon,
                    Number(place.y),
                    Number(place.x)
                  )
                : 0;

              return (
                <li
                  key={`${place.x}-${place.y}-${place.place_name}`}
                  className="hover:bg-muted group flex cursor-pointer items-start gap-3 rounded-md p-2 transition-colors"
                  onClick={() => {
                    setTerm(place.place_name);
                    onSelect?.(place);
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
                      {stableCoords && (
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
