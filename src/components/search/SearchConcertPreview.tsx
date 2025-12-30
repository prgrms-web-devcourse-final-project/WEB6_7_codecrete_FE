import Link from "next/link";
import SearchConcertCard from "@/components/search/SearchConcertCard";
import { getSearchConcerts } from "@/lib/api/search/search.server";
import { SpotlightIcon } from "lucide-react";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "../ui/empty";
import { getAuthStatus } from "@/lib/auth/auth.server";

export default async function SearchConcertPreview({ keyword }: { keyword: string }) {
  const isAuthenticated = await getAuthStatus();
  const concerts = await getSearchConcerts({
    keyword,
    isAuthenticated,
    size: 8,
  });

  if (concerts.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-400 flex-col gap-8">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">공연</h2>
          <Link href={`/search/concerts?keyword=${keyword}`}>더보기</Link>
        </div>
        <div className="py-40">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <SpotlightIcon />
              </EmptyMedia>
              <EmptyTitle>검색 결과 없음</EmptyTitle>
              <EmptyDescription>검색어에 해당하는 공연이 없습니다.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-400 flex-col gap-8">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">공연</h2>
        <Link href={`/search/concerts?keyword=${keyword}`}>더보기</Link>
      </div>
      <div className="flex flex-col gap-6">
        {concerts.map((concert) => (
          <SearchConcertCard key={concert.id} concert={concert} isAuthenticated={isAuthenticated} />
        ))}
      </div>
    </div>
  );
}
