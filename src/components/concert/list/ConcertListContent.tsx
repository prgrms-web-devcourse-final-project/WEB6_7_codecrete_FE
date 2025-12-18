import ConcertCard from "@/components/concert/ConcertCard";
import { SortSelect } from "@/components/common/SortSelect";
import { twMerge } from "tailwind-merge";
import { ConcertData } from "@/components/concert/ConcertType";

async function getConcerts() {
  // 기본 : 좋아요 순 정렬
  const res = await fetch("http://localhost:8080/api/v1/concerts/list/LIKE?page=0&size=12");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function ConcertListContent() {
  const res = await getConcerts();
  const concertsList = res.data;

  return (
    <section className="px-15 py-16">
      <div className={twMerge(`mx-auto flex w-full max-w-400 flex-col gap-9`)}>
        <div className="header flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-text-main text-2xl font-bold">{concertsList.length}</span>
            <span className="text-text-main text-lg">items</span>
          </div>
          <SortSelect />
        </div>
        <div className="list grid gap-8 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {concertsList.map((concert: ConcertData) => (
            <ConcertCard
              key={concert.id}
              id={concert.id}
              posterUrl="/ConcertPoster.png"
              // 현재 파일이 없어서 임의로 대체
              name={concert.name}
              startDate={concert.startDate}
              endDate={concert.endDate}
              placeName={concert.placeName}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
