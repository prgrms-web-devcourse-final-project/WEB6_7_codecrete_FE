import { SortSelect } from "@/components/common/SortSelect";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function CommentInput() {
  /**
   * TODO:
   * - 댓글 작성 API 연동 후 입력값을 state로 관리 (useState / form 라이브러리 검토)
   * - 비로그인 사용자 접근 제어 (입력 비활성화 또는 로그인 유도)
   * - 댓글 작성 성공 시 textarea 초기화 및 목록 리프레시 처리
   */
  return (
    <>
      <div className={"flex justify-between"}>
        {/**
         * TODO:
         * - 댓글 개수(count) API 데이터로 교체
         */}
        <h3 className={"text-xl font-bold"}>댓글 (38)</h3>
        {/**
         * TODO:
         * - 댓글 정렬 기준 상태 관리 (최신순 / 좋아요순 등)
         * - 정렬 변경 시 API 재요청 또는 query 파라미터 반영
         */}
        <SortSelect />
      </div>
      <div className={"flex gap-4"}>
        {/**
         * TODO:
         * - 로그인 유저 프로필 이미지 API 연동
         * - 이미지 없는 경우 AvatarFallback 처리 규칙 정의
         */}
        <Avatar className={"h-10 w-10"}>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className={"flex flex-1 flex-col gap-3"}>
          {/**
           * TODO:
           * - 입력값 state 연결 및 onChange 핸들링
           * - 최대 글자 수 제한 및 안내 문구 추가 여부 검토
           * - 엔터/쉬프트+엔터 입력 정책 결정
           */}
          <Textarea
            placeholder={"의견을 남기거나 질문을 작성해 주세요.\n"}
            aria-label={"댓글 입력"}
            className={"h-24 resize-none"}
          />
          <div className={"flex justify-between"}>
            <span className={"text-text-sub text-sm"}>
              서로를 존중하는 댓글 문화를 만들어 주세요.
            </span>
            {/**
             * TODO:
             * - 입력값 없을 경우 버튼 disabled 처리
             * - 댓글 등록 API 호출 및 로딩 상태 처리
             */}
            <Button size={"lg"} aria-label={"댓글 등록"}>
              댓글 등록
            </Button>
          </div>
        </div>
      </div>

      <Separator />
    </>
  );
}
