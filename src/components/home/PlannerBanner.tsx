import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function PlannerBanner() {
  return (
    <section className="my-10 w-full px-5 md:my-15 lg:my-20 lg:px-15">
      <div className="mx-auto max-w-400">
        <Card className="bg-bg-sub relative overflow-hidden px-6 py-10 md:px-10 md:py-12 xl:bg-[url('/images/bn_planner.png')] xl:bg-contain xl:bg-right xl:bg-no-repeat xl:px-16 xl:py-20">
          {/* 모바일 배경 이미지 */}
          <div className="absolute top-0 right-0 h-full w-full bg-[url('/images/bn_planner.png')] bg-contain bg-right bg-no-repeat opacity-20 xl:hidden" />

          {/* 텍스트 */}
          <div className="relative z-10 space-y-4 md:space-y-5 lg:space-y-6">
            <h2 className="text-text-main text-2xl leading-tight font-bold md:text-3xl lg:text-5xl lg:leading-normal">
              완벽한 공연, <br />그 이상의 하루를 위해
            </h2>
            <p className="text-text-sub text-sm font-medium md:text-base lg:text-lg">
              공연장 가는 길 체크하고, 같이 떼창할 메이트도 구해보세요
            </p>
            {/* TODO : 플래너 만들기 연결 */}
            <Link
              href="/planner"
              className="bg-point-main text-text-point-sub inline-flex items-center justify-center gap-1 rounded-4xl px-5 py-3 text-xs font-semibold transition-transform hover:scale-105 md:gap-2 md:px-7 md:py-3.5 md:text-base lg:max-w-45 lg:px-8 lg:py-4"
            >
              지금 시작하기
              <ChevronRight className="size-3 md:size-4" />
            </Link>
          </div>
        </Card>
      </div>
    </section>
  );
}
