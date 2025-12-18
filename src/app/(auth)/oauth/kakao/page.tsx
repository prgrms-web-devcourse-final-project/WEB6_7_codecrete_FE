"use client";
import { useOAuthCallback } from "@/hooks/useOAuthCallback";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";

// TODO: 로그인 실패 시 서버 에러 메시지 기반 분기 처리
// TODO: 네트워크 오류/타임아웃에 대한 UX 개선 (로딩/재시도)

export default function KakaoCallbackPage() {
  useOAuthCallback("kakao");
  return (
    <Empty className="w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>카카오 로그인 중이에요</EmptyTitle>
        <EmptyDescription>곧 홈 화면으로 이동할게요 🙂</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
