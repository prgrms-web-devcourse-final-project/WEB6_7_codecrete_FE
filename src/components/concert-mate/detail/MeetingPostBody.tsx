import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { twMerge } from "tailwind-merge";

type ReviewPostBody = {
  showBadge: boolean;
};

export default function MeetingPostBody({ showBadge }: ReviewPostBody) {
  /**
   * TODO:
   * - 리뷰 본문 데이터를 API 연동 후 props로 전달하도록 변경
   * - 현재는 퍼블리싱을 위한 하드코딩 텍스트 상태
   */
  return (
    <>
      <section className="flex flex-col gap-4">
        {/**
         * TODO:
         * - 리뷰 본문(content) API 데이터로 교체
         * - Markdown 형식으로 내려오는 경우 렌더링 방식 결정 필요
         */}
        <p>
          이번 공연은 기대 이상이었습니다. 무대 구성부터 사운드, 관객 동선까지 전반적으로 잘 설계된
          공연이었고, 처음 콘서트를 관람하는 분들도 부담 없이 즐길 수 있는 분위기였습니다.
        </p>

        {/**
         * TODO:
         * - 본문 내 소제목도 데이터 기반으로 관리할지 여부 논의
         */}
        <h2 className="mt-6 text-base font-medium">세트리스트 하이라이트</h2>

        <p>
          공연 초반에는 신나는 곡들로 분위기를 빠르게 끌어올렸고, 중반부에는 감성적인 무대로
          몰입도를 높였습니다. 앙코르 무대에서는 대표곡이 연달아 이어지며 현장의 열기가 최고조에
          달했습니다.
        </p>

        {/**
         * TODO:
         * - 공연 이미지 URL API 연동
         * - 이미지 여러 장일 경우 캐러셀 적용 여부 검토
         * - 이미지 로딩 실패 시 fallback UI 처리
         */}
        <div className="flex h-100 items-center justify-center bg-gray-300">
          <span className="text-text-sub">공연 현장 사진</span>
        </div>
      </section>

      <Separator />

      {/**
       * TODO:
       * - 좋아요(like) 기능 API 연동
       * - 로그인 여부에 따른 클릭 제한 처리
       * - 이미 좋아요한 경우 상태 표시 (active / filled icon)
       */}
      <div className="flex justify-between">
        <div>
          <Button variant={"outline"}>
            <Heart /> 124
          </Button>
        </div>

        {/**
         * 동행 구인 페이지 전용
         * - props로 true 전달
         */}
        {showBadge && (
          <Badge className={twMerge(`bg-point-main text-text-point-main mr-2 text-sm`)}>
            closed
          </Badge>
        )}
      </div>
      <Separator />
    </>
  );
}
