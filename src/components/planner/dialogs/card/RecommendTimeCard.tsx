"use client";

import { ZapIcon, TriangleAlert } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatTimeToKoreanAMPM } from "@/utils/helpers/formatters";
import type { TimeValidationResult } from "@/utils/helpers/scheduleValidation";
import { cn } from "@/lib/utils";

interface RecommendTimeCardProps {
  travelDuration: number;
  recommendedStartTime: string;
  onApply: () => void;
  validation: TimeValidationResult;
}

export default function RecommendTimeCard({
  travelDuration,
  recommendedStartTime,
  onApply,
  validation,
}: RecommendTimeCardProps) {
  const travelMinutes = Math.ceil(travelDuration / 60);
  const hasWarning = !validation.isValid;

  return (
    <Card
      className={cn(
        "border-amber-600/20 bg-amber-600/5 p-4",
        hasWarning && "border-red-600/20 bg-red-600/5"
      )}
    >
      <div className="space-y-3">
        {/* 헤더 */}
        <div className="flex items-center gap-2">
          <div className={cn("rounded-full bg-amber-600/5 p-1.5", hasWarning && "bg-red-600/5")}>
            {hasWarning ? (
              <TriangleAlert className="size-4 text-red-600" />
            ) : (
              <ZapIcon className="size-4 text-amber-600" />
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
          <div className="flex justify-between">
            <span>추천 시작 시간</span>
            <span className="text-primary font-semibold">
              {formatTimeToKoreanAMPM(recommendedStartTime)}
            </span>
          </div>
        </div>

        {/* ✅ 경고 영역 - 조건부 렌더링 */}
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

        {/* 버튼 */}
        <Button type="button" size="sm" className="w-full" onClick={onApply}>
          추천 시간으로 설정
        </Button>

        {/* 안내 문구 */}
        <p className="text-muted-foreground text-xs">
          * 교통 상황에 따라 실제 소요시간은 다를 수 있습니다
        </p>
      </div>
    </Card>
  );
}
