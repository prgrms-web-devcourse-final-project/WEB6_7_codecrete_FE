"use client";

import { ZapIcon, TriangleAlert, Clover } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatTimeToKoreanAMPM } from "@/utils/helpers/formatters";
import type { TimeValidationResult } from "@/utils/helpers/scheduleValidation";
import { cn } from "@/lib/utils";

interface RecommendTimeCardProps {
  travelDuration: number;
  recommendedStartTime: string;
  currentStartTime?: string;
  onApply: () => void;
  validation: TimeValidationResult;
}

export default function RecommendTimeCard({
  travelDuration,
  recommendedStartTime,
  currentStartTime,
  onApply,
  validation,
}: RecommendTimeCardProps) {
  const travelMinutes = Math.ceil(travelDuration / 60);
  const hasWarning = !validation.isValid;

  // 추천 시간과 현재 입력 시간이 정확히 일치하는지 체크 (HH:mm 형식으로 비교)
  const isPerfectMatch =
    currentStartTime && currentStartTime.substring(0, 5) === recommendedStartTime.substring(0, 5);

  // 예상 도착 시간 계산 (추천 시간에서 버퍼 10분 빼기)
  const calculateArrivalTime = (recommendedTime: string) => {
    const [hours, minutes] = recommendedTime.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes - 10; // 버퍼 10분 제거
    const arrivalHours = Math.floor(totalMinutes / 60);
    const arrivalMinutes = totalMinutes % 60;
    return `${String(arrivalHours).padStart(2, "0")}:${String(arrivalMinutes).padStart(2, "0")}`;
  };

  const arrivalTime = calculateArrivalTime(recommendedStartTime);

  // 카드 스타일 결정
  const cardStyle = hasWarning
    ? "border-red-600/20 bg-red-600/5"
    : isPerfectMatch
      ? "border-green-600/20 bg-green-600/5"
      : "border-amber-600/20 bg-amber-600/5";

  const iconStyle = hasWarning
    ? "bg-red-600/5"
    : isPerfectMatch
      ? "bg-green-600/5"
      : "bg-amber-600/5";

  const iconColor = hasWarning
    ? "text-red-600"
    : isPerfectMatch
      ? "text-green-600"
      : "text-amber-600";

  return (
    <Card className={cn("p-4", cardStyle)}>
      <div className="space-y-3">
        {/* 헤더 */}
        <div className="flex items-center gap-2">
          <div className={cn("rounded-full p-1.5", iconStyle)}>
            {hasWarning ? (
              <TriangleAlert className="size-4 text-red-600" />
            ) : isPerfectMatch ? (
              <Clover className={cn("size-4", iconColor)} />
            ) : (
              <ZapIcon className={cn("size-4", iconColor)} />
            )}
          </div>
          <p className="text-sm font-medium">이동 시간 기반 추천</p>
        </div>
        {/* 추천 정보 */}
        <div className="text-muted-foreground space-y-1 text-sm">
          <div className="flex justify-between">
            <span>예상 이동 시간</span>
            <span className="text-primary font-semibold">약 {travelMinutes}분</span>
          </div>
          {!isPerfectMatch && (
            <div className="flex justify-between">
              <span>추천 시작 시간</span>
              <span className="text-primary font-semibold">
                {formatTimeToKoreanAMPM(recommendedStartTime)}
              </span>
            </div>
          )}
        </div>

        {/* 경고 영역 - 조건부 렌더링 */}
        {hasWarning && (
          <div className="space-y-1 rounded-md bg-red-600/10 p-3 text-xs text-red-600">
            <p className="font-semibold">
              {validation.type === "insufficient"
                ? "이전 일정에 등록된 장소에서 현재 선택된 장소까지 이동 시간이 부족합니다."
                : "현재 설정된 시간이 이전 일정과 겹칩니다."}
            </p>

            {validation.recommendedStartTime && (
              <p className="text-foreground">
                → {formatTimeToKoreanAMPM(validation.recommendedStartTime)} 이후로 설정하시거나,
                추천 시간으로 설정 버튼을 눌러주세요.
              </p>
            )}
          </div>
        )}

        {/* 여유 시간 있음 - 노란색 */}
        {!isPerfectMatch &&
          !hasWarning &&
          validation.bufferTime !== undefined &&
          validation.bufferTime > 0 && (
            <div className="space-y-1 rounded-md bg-amber-600/10 p-3 text-xs text-amber-600">
              <p className="font-semibold">
                예상 도착 시간({formatTimeToKoreanAMPM(arrivalTime)})보다 {validation.bufferTime}분
                여유가 있어요.
              </p>
            </div>
          )}

        {/* 추천 시간 적용 버튼 */}
        {!isPerfectMatch && (
          <>
            {/* 버튼 */}
            <Button type="button" size="sm" className="w-full" onClick={onApply}>
              추천 시간으로 설정
            </Button>

            {/* 안내 문구 */}
            <p className="text-muted-foreground text-xs">
              * 교통 상황에 따라 실제 소요시간은 다를 수 있습니다
            </p>
          </>
        )}

        {/* 추천 시간 설정 완료 */}
        {isPerfectMatch && (
          <div className="space-y-1 rounded-md bg-green-600/10 p-3 text-xs text-green-600">
            <p className="font-semibold">
              내콘부에서 추천하는 시간으로 설정해주셨군요! 일정이 원활하게 진행될 거예요.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
