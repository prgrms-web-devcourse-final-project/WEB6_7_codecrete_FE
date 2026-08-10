import ConcertCard from "@/components/concert/ConcertCard";
import ListSortClient from "@/components/concert/list/ListSortClient";
import { ConcertData } from "@/types/concerts";
import CommentPagination from "@/components/review/post/comments/CommentPagination";
import { getConcerts, totalConcertCount } from "@/lib/api/concerts/concerts.server";

export default async function ConcertListContent({
  sortType = "REGISTERED",
  page = "1",
}: {
  sortType?: string;
  page?: string;
}) {
  const apiPage = String(Number(page) - 1); // 사용자용 1 → API용 0
  const res = await getConcerts(sortType, apiPage);
  const initialList = res.data;

  const totalCount = await totalConcertCount();
  const totalPages = Math.ceil(totalCount / 12);

  // TODO : sort가 변경될 떄도 스켈레톤이 뜨게 함
  return (
    // 정렬 수정 시, 스켈레톤 사이즈 주의 <ConcertCardSkeleton/>
    <section className="px-5 py-7 lg:px-15 lg:py-16">
      <div className="mx-auto flex w-full max-w-400 flex-col gap-5 lg:gap-8">
        <div className="header flex items-center justify-between">
          <div className="flex items-center gap-1 lg:gap-2">
            <span className="text-text-main text-xl font-bold lg:text-2xl">{totalCount}</span>
            <span className="text-text-main text-sm lg:text-lg">items</span>
          </div>
          {/* TODO : 정렬 API 수정 따라 수정 */}
          <ListSortClient />
        </div>
        <div className="list grid grid-cols-2 gap-x-4 gap-y-8 pb-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-10">
          {initialList.map((concert: ConcertData, index: number) => (
            <ConcertCard
              key={`${concert.id}-${index}`} // 중복 처리 로직 지울 때 에러 해결용
              id={concert.id}
              posterUrl={concert.posterUrl}
              name={concert.name}
              startDate={concert.startDate}
              endDate={concert.endDate}
              placeName={concert.placeName}
            />
          ))}
        </div>
      </div>

      <CommentPagination totalPages={totalPages} />
    </section>
  );
}
