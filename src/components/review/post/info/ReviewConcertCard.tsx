import PosterBox from "@/components/review/post/info/PosterBox";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import InfoRow from "@/components/review/post/info/InfoRow";
import { ConcertDetail } from "@/types/concerts";
import { formatDateRangeKorean } from "@/utils/helpers/formatters";
import Link from "next/link";

export default function ReviewConcertCard({ concertDetail }: { concertDetail: ConcertDetail }) {
  return (
    <Card className={"p-6"}>
      <Link
        href={`/concerts/${concertDetail.concertId}`}
        className={"flex items-center gap-6"}
        aria-label={`${concertDetail.name} 공연 상세 보기`}
      >
        <PosterBox posterUrl={concertDetail.posterUrl} />

        <CardContent className={"flex flex-1 flex-col gap-2"}>
          <p className={"text-text-sub"}>콘서트 리뷰</p>

          <CardTitle className={"line-clamp-1 text-xl"}>{concertDetail.name}</CardTitle>

          <div className={"flex flex-col gap-4"}>
            <div className={"flex justify-between gap-4"}>
              <InfoRow
                label={"공연 날짜"}
                value={formatDateRangeKorean(concertDetail.startDate, concertDetail.endDate)}
              />
              <InfoRow label={"공연 장소"} value={concertDetail.placeAddress} />
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
