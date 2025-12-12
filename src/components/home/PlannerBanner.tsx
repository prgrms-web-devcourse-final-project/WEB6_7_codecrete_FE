import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function PlannerBanner() {
  return (
    <section className="mx-auto my-20 w-full max-w-400 px-15">
      <Card className="bg-bg-sub bg-[url('/images/bn_planner.png')] bg-contain bg-right bg-no-repeat px-16 py-20">
        <h2 className="text-text-main text-5xl leading-normal font-bold">
          완벽한 공연, <br />그 이상의 하루를 위해
        </h2>
        <p className="text-text-sub text-lg font-medium">
          공연장 가는 길 체크하고, 같이 떼창할 메이트도 구해보세요
        </p>
        <Link
          href="/planner"
          className="bg-point-main text-text-point-sub flex max-w-45 items-center justify-center gap-2 rounded-4xl px-8 py-4 text-base font-semibold"
        >
          지금 시작하기
          <ChevronRight size={16} />
        </Link>
      </Card>
    </section>
  );
}
