"use client";

import { AlertCircle, ArrowLeftIcon, HomeIcon, LockIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function PlannerError() {
  const router = useRouter();
  return (
    <div className="from-background via-background to-point-main/5 flex min-h-screen items-center justify-center bg-linear-to-br px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="relative z-10">
          {/* 아이콘 */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="bg-point-main/15 relative rounded-full p-6">
                <LockIcon className="text-point-main h-10 w-10" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* 제목 */}
          <h1 className="text-foreground mb-4 text-center text-3xl font-bold">접근할 수 없어요!</h1>

          {/* ✅ 에러 메시지 표시 */}
          <div className="mb-8 text-center text-base">
            {/* <p className="text-text-sub mb-2 leading-relaxed">{errorMessage}</p> */}
            <p className="text-text-sub/70">
              플래너 소유자에게 접근 권한을 부여받으면 사용할 수 있어요.
            </p>
          </div>

          {/* 안내 박스 */}
          <div className="bg-point-main/5 border-point-main/30 mb-8 flex gap-3 rounded-lg border p-4">
            <AlertCircle className="text-point-main mt-1 size-4 shrink-0" />
            <div className="text-text-sub text-left text-sm">
              <p className="text-foreground mb-1 text-base font-medium">안내</p>
              <p>페이지를 다시 로드하거나 지원팀에 문의해주세요.</p>
            </div>
          </div>

          {/* 버튼 */}
          <div className="mb-8 flex flex-col gap-3">
            <Button
              onClick={() => router.back()}
              variant="outline"
              size="lg"
              className="border-border hover:border-point-main/50 w-full"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              뒤로 가기
            </Button>
            <Button
              onClick={() => router.push("/")}
              size="lg"
              className="bg-point-main hover:bg-point-main/90 w-full"
            >
              <HomeIcon className="h-4 w-4" />
              홈으로 돌아가기
            </Button>
          </div>

          {/* 지원 */}
          <div className="border-border/50 border-t pt-6">
            <p className="text-text-sub/70 mb-4 text-center text-sm">문제가 계속되나요?</p>
            <Button
              variant="ghost"
              className="text-point-main hover:text-point-main hover:bg-point-main/5 w-full"
              asChild
            >
              <a href="mailto:support@naeconcertbutakhae.shop">고객 지원팀에 문의하기</a>
            </Button>
          </div>

          {/* 에러 ID (개발 모드) */}
          {/* {process.env.NODE_ENV === "development" && error.digest && (
            <div className="border-border/30 mt-8 border-t pt-6 text-center">
              <p className="text-text-sub/50 font-mono text-xs">Error ID: {error.digest}</p>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
