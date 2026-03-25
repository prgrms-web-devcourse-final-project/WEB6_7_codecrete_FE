import { concertQueries } from "@/queries/concerts";
import { plannerQueries } from "@/queries/planner";
import { PlanList } from "@/types/planner";
import { formatDateKorean } from "@/utils/helpers/formatters";
import { useQuery } from "@tanstack/react-query";
import { CalendarDaysIcon, MapPinIcon, SpotlightIcon, Users2Icon } from "lucide-react";
import Link from "next/link";
import PlannerListSkeleton from "./PlannerListSkeleton";

export default function PlannerListItem({
  plan,
  isLoading,
}: {
  plan: PlanList;
  isLoading: boolean;
}) {
  const { data: concertDetail, isLoading: isConcertLoading } = useQuery(
    concertQueries.detail(plan.concertId.toString())
  );
  const { data: planDetail, isLoading: isPlanLoading } = useQuery(
    plannerQueries.detail(plan.id.toString())
  );

  if (isLoading || isConcertLoading || isPlanLoading) {
    return <PlannerListSkeleton />;
  }

  return (
    <Link
      key={plan.id}
      href={`/planner/${plan.id}`}
      className="border-input hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:hover:bg-input/50 block rounded-md border p-3 text-left"
    >
      <strong className="text-sm font-medium">{plan.title}</strong>
      <ul className="[&>li]:text-muted-foreground mt-2 space-y-1 text-xs [&>li]:flex [&>li]:items-start [&>li]:gap-1">
        <li>
          <SpotlightIcon className="mt-0.5 size-3" />
          {concertDetail?.name}
        </li>
        <li>
          <MapPinIcon className="mt-0.5 size-3" />
          {concertDetail?.placeName}
        </li>
        <li>
          <CalendarDaysIcon className="mt-0.5 size-3" />
          {formatDateKorean(plan.planDate)}
        </li>
        <li>
          <Users2Icon className="mt-0.5 size-3" />
          {planDetail?.participants.length ?? 0}명 참여
        </li>
      </ul>
    </Link>
  );
}
