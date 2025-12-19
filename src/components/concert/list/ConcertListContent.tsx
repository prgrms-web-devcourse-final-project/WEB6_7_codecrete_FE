import ConcertCard from "@/components/concert/ConcertCard";
import { twMerge } from "tailwind-merge";
import { ConcertData } from "@/components/concert/ConcertType";
import ListSortClient from "@/components/concert/list/ListSortClient";

async function getConcerts(sortType: string = "LIKE") {
  // 기본 : 좋아요 순 정렬
  const res = await fetch(`http://localhost:8080/api/v1/concerts/list/${sortType}?page=0&size=12`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function ConcertListContent({
  searchParams,
}: {
  searchParams: { sort?: string };
}) {
  const sortType = searchParams.sort;

  const res = await getConcerts(sortType);
  const concertsList = res.data;

  return (
    <section className="px-15 py-16">
      <div className={twMerge(`mx-auto flex w-full max-w-400 flex-col gap-9`)}>
        <div className="header flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-text-main text-2xl font-bold">{concertsList.length}</span>
            <span className="text-text-main text-lg">items</span>
          </div>
          <ListSortClient />
        </div>
        <div className="list grid gap-8 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {concertsList.map((concert: ConcertData) => (
            <ConcertCard
              key={concert.id}
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
    </section>
  );
}
