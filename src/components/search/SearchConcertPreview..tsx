import { twMerge } from "tailwind-merge";
import Link from "next/link";
import SearchConcertCard from "@/components/search/SearchConcertCard";

export default function SearchConcertPreview() {
  return (
    <div className={twMerge(`mx-auto flex w-full max-w-400 flex-col gap-8`)}>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">공연</h2>
        <Link href="/search/concerts">더보기</Link>
      </div>
      <div className="flex flex-col gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <SearchConcertCard key={index} />
        ))}
      </div>
    </div>
  );
}
