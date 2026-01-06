"use client";
import { useEffect, useOptimistic, useState, useTransition } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { ConcertDatePicker } from "../concert/detail/ConcertDatePicker";
import { FieldGroup, Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { AutoCompleteConcerts } from "@/types/search";
import { getSearchConcertsAutoComplete } from "@/lib/api/search/search.client";
import { CalendarDaysIcon, Loader2Icon, MapPinIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { getConcertDetail } from "@/lib/api/concerts/concerts.client";
import { ConcertDetail } from "@/types/concerts";
import { toast } from "sonner";
import { formatDateRange } from "@/utils/helpers/formatters";
import { createNewPlan } from "@/lib/api/planner/planner.client";
import { getConcertStartDate, isSameDay, dateToISOString } from "@/utils/helpers/handleDate";

export default function PlannerCreate() {
  const router = useRouter();
  const [isCreatingPlan, startPlanCreation] = useTransition();
  const [isPending, startTransition] = useTransition();

  // 플래너 생성 모달 상태
  const [plannerDialogOpen, setPlannerDialogOpen] = useState(true);

  // 플래너 정보 상태 관리
  const [plannerTitle, setPlannerTitle] = useState<string>("");
  const [plannerDate, setPlannerDate] = useState<Date | undefined>(undefined);

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

  useEffect(() => {
    if (!plannerDialogOpen) return;

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

          const data = await getSearchConcertsAutoComplete({
            keyword: search,
            start: 0,
            end: 30,
          });
          setConcertsResult(data);
        } catch (error) {
          console.error("검색 오류:", error);
          setConcertsResult([]);
        }
      });
    }, 300);

    return () => clearTimeout(delayTimer);
  }, [search, setOptimisticResults, plannerDialogOpen]);

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

  const handleClosePlannerModal = () => {
    setPlannerDialogOpen(false);
  };

  // 콘서트 선택 시 API 호출
  const handleSelectConcert = async (concert: AutoCompleteConcerts) => {
    setSelectedConcert(concert);
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
    } finally {
      setIsLoadingConcertDetail(false);
    }
  };

  // 선택된 콘서트 취소 핸들러
  const handleDeselectConcert = () => {
    setSelectedConcert(null);
    setConcertDetail(null);
    setPlannerDate(undefined);
  };

  // 플래너 닫기 시 콘서트 목록 페이지로 이동
  useEffect(() => {
    if (!plannerDialogOpen) {
      const timer = setTimeout(() => {
        router.push("/concerts");
      }, 300); // 모달 닫기 애니메이션 대기

      return () => clearTimeout(timer);
    }
  }, [plannerDialogOpen, router]);

  // 플래너 생성 핸들러
  const handleCreateNewPlan = () => {
    startPlanCreation(async () => {
      if (!selectedConcert?.id) {
        toast.error("선택된 공연이 없습니다.");
        return;
      }
      if (!plannerTitle) {
        toast.error("플래너 제목을 입력해주세요.");
        return;
      }
      if (!plannerDate) {
        toast.error("플래너 날짜를 선택해주세요.");
        return;
      }

      // 공연 당일 확인
      const concertStart = getConcertStartDate(concertDetail?.startDate || "");
      if (isSameDay(plannerDate, concertStart)) {
        toast.error("오늘은 공연 시작일이므로 플래너를 생성할 수 없습니다.");
        return;
      }

      const data = await createNewPlan({
        concertId: selectedConcert.id.toString(),
        title: plannerTitle.trim(),
        planDate: dateToISOString(plannerDate),
      });

      if (!data) {
        toast.error("플래너 생성에 실패했습니다.");
        return;
      }

      // 성공 후 링크 이동
      toast.success("플래너가 생성되었습니다.");
      router.push(`/planner/${data.data.id}`);
    });
  };

  return (
    <Dialog
      open={plannerDialogOpen}
      onOpenChange={handleClosePlannerModal}
      aria-description="해당 공연 정보로 플래너 만들기"
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>플래너 만들기</DialogTitle>
        </DialogHeader>
        <FieldGroup className="max-h-[60vh] gap-6 overflow-y-auto p-4">
          {/* 제목 입력 */}
          <Field>
            <FieldLabel>제목</FieldLabel>
            <Input
              type="text"
              placeholder="플래너 제목을 입력하세요"
              value={plannerTitle}
              onChange={(e) => setPlannerTitle(e.target.value)}
            />
          </Field>

          {/* 콘서트 선택 또는 검색 */}
          <Field>
            <FieldLabel>콘서트 선택</FieldLabel>

            {!selectedConcert ? (
              <>
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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
          </Field>

          {/* 콘서트 선택되고 정보 로드 완료된 경우에만 날짜 선택 표시 */}
          {selectedConcert && !isLoadingConcertDetail && concertDetail && (
            <Field>
              <FieldLabel>날짜</FieldLabel>
              <ConcertDatePicker
                startDate={new Date(concertDetail.startDate)}
                endDate={new Date(concertDetail.endDate)}
                onChange={(date) => setPlannerDate(date)}
              />
            </Field>
          )}
        </FieldGroup>

        {/* 콘서트 선택되고 정보 로드 완료된 경우에만 버튼 표시 */}
        {selectedConcert && !isLoadingConcertDetail && (
          <DialogFooter>
            <Button variant="outline" onClick={handleClosePlannerModal}>
              취소
            </Button>
            <Button
              onClick={handleCreateNewPlan}
              disabled={!plannerTitle.trim() || !plannerDate || isCreatingPlan}
            >
              {isCreatingPlan ? (
                <>
                  <Loader2Icon className="mr-2 size-4 animate-spin" />
                  생성 중...
                </>
              ) : (
                "생성"
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
