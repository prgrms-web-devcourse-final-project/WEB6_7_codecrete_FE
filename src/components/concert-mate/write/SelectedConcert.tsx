"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getConcertDetail } from "@/lib/api/concerts/concerts.client";
import { getSearchConcerts } from "@/lib/api/search/search.client";
import { cn } from "@/lib/utils";
import { MatePostWrite } from "@/types/community/concert-mate";
import { ConcertDetail } from "@/types/concerts";
import { AutoCompleteConcerts } from "@/types/search";
import { formatDateRange } from "@/utils/helpers/formatters";
import { CalendarDaysIcon, MapPinIcon, XIcon } from "lucide-react";
import { useEffect, useOptimistic, useState, useTransition } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

export default function SelectedConcert({ initialConcertId }: { initialConcertId?: number }) {
  const {
    setValue,
    // 필수 항목 에러 처리를 위해 추가
    register,
    formState: { errors },
  } = useFormContext<MatePostWrite>();

  useEffect(() => {
    register("concertId", {
      required: "공연을 선택해주세요.",
      validate: (value) => value !== 0 || "공연을 선택해주세요.",
    });
  }, [register]);

  const [isPending, startTransition] = useTransition();
  // 선택된 콘서트 상태
  const [selectedConcert, setSelectedConcert] = useState<AutoCompleteConcerts | null>(null);

  // 선택된 콘서트의 상세 정보
  const [concertDetail, setConcertDetail] = useState<ConcertDetail | null>(null);

  // 콘서트 상세 정보 로딩 상태
  const [isLoadingConcertDetail, setIsLoadingConcertDetail] = useState(false);

  const [search, setSearch] = useState<string>("");
  const [concertsResult, setConcertsResult] = useState<AutoCompleteConcerts[]>([]);

  // 낙관적 업데이트
  const [optimisticResults, setOptimisticResults] = useOptimistic<
    AutoCompleteConcerts[],
    AutoCompleteConcerts[]
  >(concertsResult, (_, newResults) => newResults);

  // 초기 콘서트 로드 (수정 페이지용)
  useEffect(() => {
    if (initialConcertId && initialConcertId !== 0) {
      const loadInitialConcert = async () => {
        setIsLoadingConcertDetail(true);
        try {
          const data = await getConcertDetail({ concertId: initialConcertId.toString() });

          if (!data) {
            throw new Error("콘서트 정보를 불러올 수 없습니다.");
          }

          // 선택된 콘서트와 상세 정보 설정
          setSelectedConcert({
            id: Number(data.concertId),
            name: data.name,
            // AutoCompleteConcerts 타입에 맞게 필요한 필드만 설정
          });
          setConcertDetail(data);
          setValue("concertId", Number(data.concertId));
        } catch (error) {
          console.error("초기 콘서트 로드 오류:", error);
          toast.error("콘서트 정보를 불러올 수 없습니다.");
        } finally {
          setIsLoadingConcertDetail(false);
        }
      };

      loadInitialConcert();
    }
  }, [initialConcertId, setValue]);

  // 빈 상태 메시지
  const getEmptyMessage = () => {
    if (isPending && search.trim().length >= 2) {
      return "검색 중...";
    }
    if (search.trim() === "") {
      return "검색어를 입력해주세요.";
    }
    if (search.trim().length < 2) {
      return "2글자 이상 입력해주세요.";
    }
    return "검색 결과가 없습니다.";
  };

  // 콘서트 선택 시 API 호출
  const handleSelectConcert = async (concert: AutoCompleteConcerts) => {
    setSelectedConcert(concert);
    setValue("concertId", concert.id);
    setSearch(""); // 검색어 초기화
    setConcertsResult([]); // 검색 결과 초기화

    setIsLoadingConcertDetail(true);
    try {
      const concertId = concert.id.toString();
      const data = await getConcertDetail({ concertId });

      if (!data) {
        throw new Error("콘서트 정보를 불러올 수 없습니다.");
      }

      setConcertDetail(data);
    } catch (error) {
      // 에러 발생 시 선택 취소
      console.error("콘서트 상세 정보 로드 오류:", error);
      toast.error("콘서트 정보를 불러올 수 없습니다.");
      setSelectedConcert(null);
      setValue("concertId", 0);
    } finally {
      setIsLoadingConcertDetail(false);
    }
  };

  // 선택된 콘서트 취소 핸들러
  const handleDeselectConcert = () => {
    setSelectedConcert(null);
    setConcertDetail(null);
    setValue("concertId", 0);
  };

  useEffect(() => {
    // 검색어가 2글자 미만이면 초기화
    if (search.trim().length < 2) {
      startTransition(() => {
        setConcertsResult([]);
      });
      return;
    }

    const delayTimer = setTimeout(() => {
      startTransition(async () => {
        try {
          setOptimisticResults([]);

          const data = await getSearchConcerts({
            keyword: search,
            isAuthenticated: true,
            page: 0,
            size: 100,
          });
          setConcertsResult(data);
        } catch (error) {
          console.error("검색 오류:", error);
          toast.error("검색 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
          setConcertsResult([]);
        }
      });
    }, 300);

    return () => clearTimeout(delayTimer);
  }, [search, setOptimisticResults]);

  return (
    <Field className="px-6">
      <FieldLabel>
        콘서트 선택<span className="text-text-sub">*</span>
      </FieldLabel>

      {!selectedConcert ? (
        <>
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              // 린트 오류 방지용 임시
              startTransition(() => {
                setOptimisticResults(concertsResult);
              });
            }}
            placeholder="콘서트 이름으로 검색하세요."
            autoFocus
          />
          <div className="border-input scrollbar-hide max-h-50 overflow-y-auto rounded-md border">
            {optimisticResults.length === 0 ? (
              <div className="text-muted-foreground py-10 text-center text-sm">
                {getEmptyMessage()}
              </div>
            ) : (
              <div className="text-foreground overflow-hidden p-1">
                <h4 className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
                  공연
                  {isPending && <span className="ml-2 text-xs">업데이트 중...</span>}
                </h4>
                {optimisticResults.map((concert) => (
                  <button
                    key={concert.id}
                    onClick={() => handleSelectConcert(concert)}
                    disabled={isLoadingConcertDetail}
                    className={cn(
                      "hover:bg-accent hover:text-accent-foreground relative flex w-full cursor-pointer items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-sm transition-opacity outline-none",
                      (isPending || isLoadingConcertDetail) && "opacity-70"
                    )}
                  >
                    <span className="line-clamp-1 text-ellipsis whitespace-nowrap">
                      {concert.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        /* 콘서트가 선택되었을 때 */
        <div className="space-y-3">
          {/* 로딩 상태 */}
          {isLoadingConcertDetail && (
            <div className="border-input flex items-center justify-center rounded-md border p-3">
              <div className="flex items-center gap-2">
                <div className="border-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                <p className="text-muted-foreground text-sm">콘서트 정보 로드 중...</p>
              </div>
            </div>
          )}

          {/* ✅ 콘서트 정보 표시 */}
          {!isLoadingConcertDetail && (
            <div className="border-input hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:hover:bg-input/50 flex items-start justify-between rounded-md border p-3">
              <div className="flex-1">
                <strong className="text-sm font-medium">{selectedConcert.name}</strong>
                {concertDetail && (
                  <ul className="[&>li]:text-muted-foreground mt-2 space-y-1 text-xs [&>li]:flex [&>li]:items-start [&>li]:gap-1">
                    <li>
                      <CalendarDaysIcon className="mt-0.5 size-3" />
                      {formatDateRange(concertDetail.startDate, concertDetail.endDate)}
                    </li>
                    <li>
                      <MapPinIcon className="mt-0.5 size-3" />
                      {concertDetail.placeAddress} {concertDetail.placeName}
                    </li>
                  </ul>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={handleDeselectConcert}
                className="size-4 border-0"
                title="선택 취소"
              >
                <XIcon className="size-4" />
              </Button>
            </div>
          )}
        </div>
      )}
      {errors.concertId && (
        <p className="mt-2 text-xs font-medium text-red-500">{errors.concertId.message}</p>
      )}
    </Field>
  );
}
