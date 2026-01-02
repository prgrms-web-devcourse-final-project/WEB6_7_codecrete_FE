"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LockIcon, ArrowLeftIcon, HomeIcon, AlertTriangle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // 에러 로깅 (프로덕션에서는 센트리 등으로 전송 가능)
    console.error("Error detected:", error);
  }, [error]);

  // "FORBIDDEN" 에러인지 확인 (서버 액션에서 던진 메시지 기준)
  const isForbidden = error.message === "FORBIDDEN";

  // 상황별 텍스트 및 설정
  const content = isForbidden
    ? {
        icon: <LockIcon className="text-point-main h-10 w-10" strokeWidth={1.5} />,
        title: "비공개 플랜입니다",
        message: "이 플랜은 작성자만 볼 수 있도록 설정되어 있어요.",
        subMessage: "플랜 소유자라면 로그인 상태를 확인해주세요.",
        infoTitle: "안내",
        infoText: "다른 사용자의 플랜은 공개 설정된 경우에만 볼 수 있습니다.",
      }
    : {
        icon: <AlertTriangle className="text-destructive h-10 w-10" strokeWidth={1.5} />,
        title: "시스템 오류가 발생했습니다",
        message: error.message || "알 수 없는 오류가 발생했습니다.",
        subMessage: "잠시 후 다시 시도하거나, 문제가 지속되면 문의해주세요.",
        infoTitle: "해결 방법",
        infoText: "페이지를 새로고침하거나 아래 '다시 시도' 버튼을 눌러보세요.",
      };

  return (
    <div className="from-background via-background to-point-main/5 flex min-h-screen items-center justify-center bg-linear-to-br px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="relative z-10">
          {/* 아이콘 영역 */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div
                className={`relative rounded-full p-6 ${
                  isForbidden ? "bg-point-main/15" : "bg-destructive/10"
                }`}
              >
                {content.icon}
              </div>
            </div>
          </div>

          {/* 제목 및 메시지 */}
          <h1 className="text-foreground mb-4 text-center text-3xl font-bold">{content.title}</h1>

          <div className="mb-8 text-center text-base">
            <p className="text-text-sub mb-2 leading-relaxed font-medium">{content.message}</p>
            <p className="text-text-sub/70 text-sm">{content.subMessage}</p>
          </div>

          {/* 안내 박스 */}
          <div className="bg-point-main/5 border-point-main/30 mb-8 flex gap-3 rounded-lg border p-4">
            <div className="mt-0.5 shrink-0">
              {isForbidden ? (
                <LockIcon className="text-point-main size-4" />
              ) : (
                <AlertTriangle className="text-point-main size-4" />
              )}
            </div>
            <div className="text-text-sub text-left text-sm">
              <p className="text-foreground mb-1 text-base font-medium">{content.infoTitle}</p>
              <p>{content.infoText}</p>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="mb-8 flex flex-col gap-3">
            {/* 공통: 뒤로 가기 */}
            <Button onClick={() => router.back()} variant="outline" size="lg">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              이전 페이지로
            </Button>

            {/* 분기: 비공개면 '홈', 에러면 '재시도' */}
            {isForbidden ? (
              <Button onClick={() => router.push("/")} size="lg">
                <HomeIcon className="mr-2 h-4 w-4" />
                홈으로 돌아가기
              </Button>
            ) : (
              <Button onClick={() => reset()} size="lg">
                <RefreshCcw className="mr-2 h-4 w-4" />
                다시 시도하기
              </Button>
            )}
          </div>

          {/* 5. 하단 지원 링크 */}
          <div className="border-border/50 border-t pt-6">
            <p className="text-text-sub/70 mb-4 text-center text-sm">문제가 해결되지 않나요?</p>
            <Button
              variant="ghost"
              className="text-point-main hover:text-point-main hover:bg-point-main/5 w-full"
              asChild
            >
              <a href="mailto:support@naeconcertbutakhae.shop">고객 지원팀에 문의하기</a>
            </Button>
          </div>

          {/* 개발 모드용 에러 ID */}
          {process.env.NODE_ENV === "development" && error.digest && (
            <div className="border-border/30 mt-8 border-t pt-6 text-center">
              <p className="text-text-sub/50 font-mono text-xs">Error ID: {error.digest}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
