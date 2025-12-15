import ConcertCard from "@/components/concert/ConcertCard";
import { SortSelect } from "@/components/common/SortSelect";

export default function ConcertListContent() {
  return (
    <section className="mx-auto flex w-full max-w-400 flex-col gap-9">
      <div className="header flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-text-main text-2xl font-bold">1,352</span>
          <span className="text-text-main text-lg">items</span>
        </div>
        <SortSelect />
      </div>
      <div className="list grid gap-8 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <ConcertCard
            key={index}
            image="/ConcertPoster.png"
            title="The Midnight Echo Live"
            date="March 15, 2025 • 8:00 PM"
            location="Madison Square Garden"
          />
        ))}
      </div>
    </section>
  );
}
