import ProfileNoImage from "@/components/common/ProfileNoImage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, UsersRoundIcon } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { PLACEHOLDER_IMAGE } from "@/components/home/upcoming-slider/constants";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { PlannerListWithDetails } from "@/types/planner";

export default function MyPagePlanCard({ schedule }: { schedule: PlannerListWithDetails }) {
  // 일정이 오늘부터 며칠 뒤에 있는지 계산 (한국날짜 기준)
  const today = new Date();
  const timeDiff = new Date(schedule.planDate).getTime() - today.getTime();
  const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) - 1;

  return (
    <Card key={schedule.id} className="bg-bg-main flex flex-row gap-6 p-6">
      {/* 포스터 */}
      <div className="relative w-35 shrink-0">
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
      <CardContent className="flex flex-1 flex-col justify-between gap-4 p-0">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold">{schedule.title}</h4>
            <span className="text-text-sub text-xs">D-{dayDiff}</span>
          </div>
          <div className="text-text-sub space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{schedule.planDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{schedule.concertDetail.placeAddress}</span>
            </div>
          </div>

          <div className="text-text-sub flex items-center gap-2 space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <UsersRoundIcon className="h-4 w-4" />
              <span>참여자</span>
            </div>
            <div className="flex -space-x-2">
              {schedule.participants.map((friend, idx) => {
                if (idx < 3)
                  return (
                    <Avatar className="ring-bg-main size-8 ring-2" key={idx}>
                      <AvatarImage src={friend.profileImage} alt={friend.nickname} />
                      <AvatarFallback>
                        <ProfileNoImage size="xs" alt={friend.nickname} />
                      </AvatarFallback>
                    </Avatar>
                  );
              })}
              {schedule.participants.length > 3 && (
                <Avatar className="ring-bg-main bg-bg-sub size-8 ring-2">
                  <AvatarFallback className="text-text-main text-xs font-medium">
                    +{schedule.participants.length - 3}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Link href={`/planner/${schedule.id}`}>
            <Button type="button">자세히 보기</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
