import { Clock4, Eye, MoreHorizontalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function MeetingPostHeader() {
  /**
   * TODO:
   * - 리뷰 게시글 상세 API 연동 후 props로 데이터 전달
   *   (title, createdAt, viewCount 등)
   * - 현재는 퍼블리싱을 위한 하드코딩 상태
   */

  return (
    <header className={"flex flex-col gap-4"}>
      {/**
       * TODO:
       * - 게시글 제목(title) API 데이터로 교체
       * - 제목 길어질 경우 line-clamp 적용 여부 논의
       */}
      <h1 className={"text-4xl"}>올림픽공원 첫 콘서트를 위한 필수 관람 팁</h1>

      <div className={"flex justify-between"}>
        <div className={"flex gap-6"}>
          <div className={"text-text-sub flex gap-6"}>
            {/**
             * TODO:
             * - 작성일(createdAt) API 데이터로 교체
             * - 날짜 포맷 유틸 함수 적용 고려 (YYYY.MM.DD)
             */}
            <div className={"flex items-center gap-2"}>
              <Clock4 size={14} />
              <p>2025년 3월 15일</p>
            </div>

            {/**
             * TODO:
             * - 조회수(viewCount) API 데이터로 교체
             * - 숫자 포맷팅 처리 (1,000 단위 콤마)
             */}
            <div className={"flex items-center gap-2"}>
              <Eye size={14} />
              <p>1,247</p>
            </div>
          </div>
        </div>

        {/**
         * TODO:
         * - 로그인 유저 기준 권한 처리 필요
         *   - 작성자 본인: 수정 / 삭제 노출
         *   - 그 외 유저: 신고만 노출
         */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-text-sub cursor-pointer hover:bg-transparent"
              aria-label="더보기 옵션"
            >
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-40" align="end">
            <DropdownMenuGroup>
              {/**
               * TODO:
               * - 수정하기: 리뷰 수정 페이지로 이동
               * - 삭제하기: 삭제 확인 모달 + API 호출
               * - 신고하기: 신고 사유 선택 모달 연동
               */}
              <DropdownMenuItem>수정하기</DropdownMenuItem>
              <DropdownMenuItem>삭제하기</DropdownMenuItem>
              <DropdownMenuItem>신고하기</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
