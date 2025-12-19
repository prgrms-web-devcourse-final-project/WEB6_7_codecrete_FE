import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";
import GoogleCallbackClient from "@/components/auth/oauth/GoogleCallbackClient";

// TODO: 로그인 실패 시 서버 에러 메시지 기반 분기 처리
// TODO: 네트워크 오류/타임아웃에 대한 UX 개선 (로딩/재시도)

export default function GoogleCallbackPage() {
  return (
    <Empty className="w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>구글 로그인 중이에요</EmptyTitle>
        <EmptyDescription role="status" aria-live="polite">
          곧 홈 화면으로 이동할게요 🙂
        </EmptyDescription>
      </EmptyHeader>

      <Suspense fallback={null}>
        <GoogleCallbackClient />
      </Suspense>
    </Empty>
  );
}
