import { Button } from "@/components/ui/button";
import { UsersRoundIcon, CalendarIcon, MapPinIcon } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { PLACEHOLDER_IMAGE } from "@/components/home/upcoming-slider/constants";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { PlannerListWithDetails } from "@/types/planner";
import { formatDateKorean } from "@/utils/helpers/formatters";

export default function MyPagePlanCard({ schedule }: { schedule: PlannerListWithDetails }) {
  // 일정이 오늘부터 며칠 뒤에 있는지 계산 (한국날짜 기준)
  const today = new Date();
  const timeDiff = new Date(schedule.planDate).getTime() - today.getTime();
  const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) - 1;

  return (
    <Card className="relative flex flex-col gap-4 p-4 sm:flex-row lg:gap-6 lg:p-6">
      {/* 포스터 */}
      <div className="relative w-full shrink-0 sm:w-35">
        <AspectRatio ratio={320 / 426.5}>
          <Image
            src={schedule.concertDetail.posterUrl ?? PLACEHOLDER_IMAGE}
            alt={schedule.concertDetail.name}
            className="rounded-2xl object-cover"
            fill
            placeholder="blur"
            blurDataURL={PLACEHOLDER_IMAGE}
            sizes="(max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
          />
        </AspectRatio>
      </div>
      {/* 일정 정보 */}
      <CardContent className="relative flex w-full flex-1 px-0 sm:justify-between">
        <div className="flex flex-1 flex-col items-start justify-between gap-4">
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold sm:text-lg lg:text-2xl">{schedule.title}</h4>
              <span className="text-text-sub text-xs">
                D{dayDiff > 0 ? `-${dayDiff}` : `+${Math.abs(dayDiff)}`}
              </span>
            </div>
            <ul className="text-text-sub space-y-1 text-sm break-keep [&>li]:grid [&>li]:grid-cols-[auto_1fr] [&>li]:gap-1 [&>li>svg]:size-5 [&>li>svg]:py-0.5">
              <li>
                <CalendarIcon />
                <span>{formatDateKorean(schedule.planDate)}</span>
              </li>
              <li>
                <MapPinIcon />
                <span>{schedule.concertDetail.placeAddress}</span>
              </li>
              <li>
                <UsersRoundIcon />
                <span>참여자 {schedule.participants.length}명</span>
              </li>
            </ul>
          </div>
          <div className="grid w-full gap-2 md:flex md:w-auto">
            <Link href={`/planner/${schedule.id}`}>
              <Button type="button" className="w-full">
                자세히 보기
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
