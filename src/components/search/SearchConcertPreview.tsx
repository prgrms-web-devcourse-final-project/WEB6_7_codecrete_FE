import Link from "next/link";
import SearchConcertCard from "@/components/search/SearchConcertCard";
import { ConcertDataWithLiked } from "@/types/concerts";
import EmptyContents from "./EmptyContents";

export default async function SearchConcertPreview({
  keyword,
  concerts,
  isAuthenticated,
}: {
  keyword: string;
  concerts: ConcertDataWithLiked[];
  isAuthenticated: boolean;
}) {
  return (
    <div className="mx-auto flex w-full max-w-400 flex-col gap-8">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">공연</h2>
        <Link href={`/search/concerts?keyword=${keyword}`}>더보기</Link>
      </div>
      {concerts.length > 0 ? (
        <div className="flex flex-col gap-6">
          {concerts.map((concert) => (
            <SearchConcertCard
              key={concert.id}
              concert={concert}
              isAuthenticated={isAuthenticated}
            />
          ))}
        </div>
      ) : (
        <EmptyContents type="concerts" />
      )}
    </div>
  );
}
