import { ConcertDataWithLiked } from "@/types/concerts";
import SearchConcertCard from "./SearchConcertCard";
import EmptyContents from "../EmptyContents";
import TitleWithMoreBtn from "@/components/common/TitleWithMoreBtn";

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
    <div className="mx-auto flex w-full max-w-400 flex-col gap-5 lg:gap-8">
      <TitleWithMoreBtn href={`/search/concerts?keyword=${keyword}`} title="공연" />
      {concerts.length > 0 ? (
        <div className="grid gap-4 lg:gap-6">
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
