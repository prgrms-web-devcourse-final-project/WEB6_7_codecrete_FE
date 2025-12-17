import { twMerge } from "tailwind-merge";
import { SortSelect } from "@/components/common/SortSelect";
import SearchConcertCard from "@/components/search/SearchConcertCard";

export default function SearchConcerts() {
  return (
    <section className="px-15 py-16">
      <div className={twMerge(`mx-auto flex w-full max-w-400 flex-col gap-9`)}>
        <div className="header flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-text-main text-2xl font-bold">1,352</span>
            <span className="text-text-main text-lg">items</span>
          </div>
          <SortSelect />
        </div>
        <div className="flex flex-col gap-6 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <SearchConcertCard key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
