import ProfileNoImage from "@/components/common/ProfileNoImage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ConcertWithTicket } from "@/types/home";
import { UserSchedule } from "@/types/my-page";
import { MapPin, Calendar, Loader2Icon } from "lucide-react";
import MyPageConcertCard from "./MyPageConcertCard";
import { dateToISOString, getConcertStartDate, isSameDay } from "@/utils/helpers/handleDate";
import { toast } from "sonner";
import { createNewPlan } from "@/lib/api/planner/planner.client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ConcertDatePicker } from "@/components/concert/detail/ConcertDatePicker";
import { Input } from "@/components/ui/input";

interface ConcertListProps {
  concerts: ConcertWithTicket[];
  schedules: UserSchedule[];
  selectedDate: Date;
}

export default function MyPageCalendarList({
  concerts,
  schedules,
  selectedDate,
}: ConcertListProps) {
  const dateStr = selectedDate.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 링크 이동
  const router = useRouter();

  // 플래너 생성 트랜지션
  const [isCreatingPlan, startPlanCreation] = useTransition();
  // 모달 상태 관리
  const [plannerDialogOpen, setPlannerDialogOpen] = useState(false);

  // 플래너 생성 상태 관리
  const [plannerTitle, setPlannerTitle] = useState<string>("");
  const [plannerDate, setPlannerDate] = useState<Date | undefined>(undefined);

  // 공연 시작일과 종료일 (모달 열 때 적용)
  const [concertId, setConcertId] = useState<string>("");
  const [concertStartDate, setConcertStartDate] = useState<string>("");
  const [concertEndDate, setConcertEndDate] = useState<string>("");

  // 모달 열기
  const handleOpenPlannerModal = ({
    concertId,
    startDate,
    endDate,
  }: {
    concertId: string;
    startDate: string;
    endDate: string;
  }) => {
    setConcertId(concertId);
    setConcertStartDate(startDate);
    setConcertEndDate(endDate);
    setPlannerDialogOpen(true);
  };
  // 모달 닫기
  const handleClosePlannerModal = () => {
    setConcertId("");
    setConcertStartDate("");
    setConcertEndDate("");
    setPlannerDialogOpen(false);
    setPlannerTitle("");
    setPlannerDate(undefined);
  };

  // 플래너 생성 핸들러
  const handleCreateNewPlan = ({
    concertId,
    concertStartDate,
  }: {
    concertId: string;
    concertStartDate: string;
  }) => {
    startPlanCreation(async () => {
      if (!plannerTitle) {
        toast.error("플래너 제목을 입력해주세요.");
        return;
      }
      if (!plannerDate) {
        toast.error("플래너 날짜를 선택해주세요.");
        return;
      }

      // 공연 당일 확인
      const concertStart = getConcertStartDate(concertStartDate!);
      if (isSameDay(plannerDate, concertStart)) {
        toast.error("오늘은 공연 시작일이므로 플래너를 생성할 수 없습니다.");
        return;
      }

      const data = await createNewPlan({
        concertId: concertId,
        title: plannerTitle.trim(),
        planDate: dateToISOString(plannerDate),
      });

      if (!data) {
        toast.error("플래너 생성에 실패했습니다.");
        return;
      }

      toast.success("플래너가 생성되었습니다.");
      setPlannerDialogOpen(false);

      router.push(`/planner/${data.data.id}`);
    });
  };

  if (concerts.length === 0 && schedules.length === 0) {
    return (
      <section className="space-y-4">
        <h3 className="text-lg font-bold">{dateStr}</h3>
        <p className="border-border text-text-sub rounded-lg border px-5 py-20 text-center">
          해당 날짜에 일정이 없습니다.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-bold">{dateStr}</h3>
      <div className="flex flex-col gap-8">
        {concerts.length > 0 && (
          <>
            <Separator className="*:text-text-main h-auto *:px-10 *:text-base *:font-bold" />
            <div className="space-y-4">
              {concerts.map((concert) => (
                <MyPageConcertCard
                  key={concert.id}
                  concert={concert}
                  onCreatePlan={() =>
                    handleOpenPlannerModal({
                      concertId: concert.id,
                      startDate: concert.startDate,
                      endDate: concert.endDate,
                    })
                  }
                />
              ))}
            </div>
            {/* 플래너 만들기 클릭 시 모달 */}
            <Dialog
              open={plannerDialogOpen}
              onOpenChange={setPlannerDialogOpen}
              aria-description="해당 공연 정보로 플래너 만들기"
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>플래너 만들기</DialogTitle>
                </DialogHeader>
                <FieldGroup className="max-h-[60vh] gap-6 overflow-y-auto p-4">
                  <Field>
                    <FieldLabel>제목</FieldLabel>
                    <Input
                      type="text"
                      placeholder="플래너 제목을 입력하세요"
                      value={plannerTitle}
                      onChange={(e) => setPlannerTitle(e.target.value)}
                    />
                  </Field>
                  <Field>
                    <FieldLabel>날짜</FieldLabel>
                    <ConcertDatePicker
                      startDate={new Date(concertStartDate?.split("-").join(",") ?? "")}
                      endDate={new Date(concertEndDate?.split("-").join(",") ?? "")}
                      onChange={(date) => setPlannerDate(date)}
                    />
                  </Field>
                </FieldGroup>
                <DialogFooter>
                  <Button variant="outline" onClick={handleClosePlannerModal}>
                    취소
                  </Button>
                  <Button
                    disabled={isCreatingPlan}
                    onClick={() => handleCreateNewPlan({ concertId, concertStartDate })}
                  >
                    {isCreatingPlan ? (
                      <>
                        <Loader2Icon className="animate-spin" />
                        생성 중...
                      </>
                    ) : (
                      "만들기"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
        {schedules.length > 0 && (
          <>
            <Separator className="*:text-text-main h-auto *:px-10 *:text-base *:font-bold">
              일정
            </Separator>
            <div className="space-y-4">
              {schedules.map((schedule) => (
                <div key={schedule.id} className="border-border flex gap-4 rounded-lg border p-4">
                  {/* 포스터 */}
                  <div className="bg-muted flex h-32 w-32 shrink-0 items-center justify-center rounded-lg">
                    <span className="text-text-sub text-sm">Concert Poster</span>
                  </div>

                  {/* 일정 정보 */}
                  <div className="flex flex-1 flex-col justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-bold">{schedule.concertTitle}</h4>
                        <span className="text-text-sub text-xs">{schedule.daysUntil}일 후</span>
                      </div>
                      <div className="text-text-sub space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {schedule.date} • {schedule.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{schedule.venue}</span>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      {schedule.goingWith.length === 0 && (
                        <span className="text-text-sub text-xs">참여자 </span>
                      )}
                      {schedule.goingWith.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-text-sub text-xs">참여자 </span>
                          <div className="flex -space-x-2">
                            {schedule.goingWith.map((friend, idx) => {
                              if (idx < 3)
                                return (
                                  <Avatar className="ring-bg-main size-8 ring-2" key={idx}>
                                    <AvatarImage />
                                    <AvatarFallback>
                                      <ProfileNoImage size="xs" alt={friend} />
                                    </AvatarFallback>
                                  </Avatar>
                                );
                            })}
                            {schedule.goingWith.length > 3 && (
                              <Avatar className="ring-bg-main bg-bg-sub size-8 ring-2">
                                <AvatarFallback className="text-text-main text-xs font-medium">
                                  +{schedule.goingWith.length - 3}
                                </AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                        </div>
                      )}
                      <Button>관리하기</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
