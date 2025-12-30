import BackPageButton from "@/components/common/BackPageButton";
import { ArrowLeftIcon, Clock4Icon, MapPinIcon } from "lucide-react";

export default function PlannerTopHeader() {
  return (
    <header className="bg-linear-to-tr from-zinc-900 to-zinc-800 px-5 py-10 lg:px-15 lg:py-28">
      <div className="mx-auto max-w-400 space-y-4 lg:space-y-6">
        {/* 뒤로 가기 버튼 */}
        <BackPageButton
          variant="ghost"
          className="flex h-auto gap-2 p-0! text-sm text-zinc-400 hover:bg-transparent hover:text-zinc-200 lg:text-base"
        >
          <ArrowLeftIcon size={16} />
          뒤로 가기
        </BackPageButton>

        {/* 타이틀 영역 */}
        <div className="space-y-2 lg:space-y-3">
          <h2 className="text-2xl font-bold text-white lg:text-4xl">먼데이키즈 영접하러 출발</h2>

          {/* 공연 정보 */}
          <p className="flex flex-col text-sm text-zinc-300 lg:flex-row lg:items-center lg:gap-2 lg:text-xl">
            <span>먼데이프로젝트 시즌8 [급한노새 단독 콘서트 ‘Adventure Time’]</span>
            <span className="hidden lg:inline">·</span>
            <span className="flex items-center gap-2">
              <span>2025.12.29</span>
              <span>·</span>
              <span>클럽온에어</span>
            </span>
          </p>
        </div>

        {/* 기타 정보 */}
        <ul className="flex flex-col gap-2 font-medium text-zinc-400 *:flex *:items-center *:gap-1 lg:flex-row lg:gap-6 lg:*:gap-2">
          <li className="text-xs lg:text-base">
            <Clock4Icon className="size-3 lg:size-4" />
            <span>공연 시간: 90분</span>
          </li>
          <li className="text-xs lg:text-base">
            <MapPinIcon className="size-3 lg:size-4" />
            <span>서울특별시 마포구 잔다리로 44(서교동)</span>
          </li>
        </ul>
      </div>
    </header>
  );
}
