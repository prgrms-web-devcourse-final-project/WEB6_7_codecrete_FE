"use client";

import { AlertCircle, ArrowLeftIcon, HomeIcon, LockIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
          <h1 className="text-foreground mb-4 text-center text-3xl font-bold">
            접근할 수 없는 플래너입니다.
          </h1>

          {/* 에러 메시지 표시 */}
          <div className="mb-8 text-center text-base">
            <p className="text-text-sub/70">접근 권한이 없는 플래너입니다.</p>
          </div>

          {/* 안내 박스 */}
          <div className="bg-point-main/5 border-point-main/30 mb-8 flex gap-3 rounded-lg border p-4">
            <AlertCircle className="text-point-main mt-1 size-4 shrink-0" />
            <div className="text-text-sub text-left text-sm">
              <p className="text-foreground mb-1 text-base font-medium">안내</p>
              <p className="break-keep">
                플래너 소유자에게 접근 권한을 부여받아야 볼 수 있어요. 동행구인 게시판에서 권한을
                요청해보세요.
              </p>
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
          <div className="border-border/50 border-t pt-6 text-center">
            <p className="text-text-sub/70 mb-4 text-center text-sm">문제가 계속되나요?</p>
            <p className="text-text-main">
              플래너에 초대되었는데도 접근할 수 없다면,{" "}
              <Link href="mailto:garlatonic@kakao.com" className="hover:underline">
                관리자
              </Link>
              에게 문의해주세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
