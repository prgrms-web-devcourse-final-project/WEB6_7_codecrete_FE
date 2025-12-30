"use client";

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";
import { SpotlightIcon } from "lucide-react";
import { ConcertDataWithLiked } from "../concert/ConcertType";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import SearchConcertCard from "./SearchConcertCard";
import { getSearchConcerts } from "@/lib/api/search.client";

export default function SearchConcerts({
  initialConcerts,
  keyword,
  isAuthenticated,
}: {
  initialConcerts: ConcertDataWithLiked[];
  keyword: string;
  isAuthenticated: boolean;
}) {
  const [searchedConcerts, setSearchedConcerts] = useState<ConcertDataWithLiked[]>(initialConcerts);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const oTarget = useRef(null);
  const pageRef = useRef(1);

  const loadMoreList = useCallback(async () => {
    setLoading(true);

    try {
      const addConcerts = await getSearchConcerts({
        keyword,
        isAuthenticated,
        page: pageRef.current,
      });

      if (addConcerts.length > 0) {
        setSearchedConcerts((prev) => [...prev, ...addConcerts]);
        pageRef.current += 1;
      }
      if (addConcerts.length < 12) {
        setHasMore(false);
        toast.success("모든 공연을 불러왔습니다.");
      }
    } catch (error) {
      console.error(error);
      toast.error("데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  }, [keyword, isAuthenticated]);

  useEffect(() => {
    if (!oTarget.current) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadMoreList();
        }
      },
      { rootMargin: "200px" }
    );

    obs.observe(oTarget.current);
    return () => {
      obs.disconnect();
    };
  }, [hasMore, loading, loadMoreList]);

  useEffect(() => {
    setSearchedConcerts(initialConcerts);
    pageRef.current = 1;
    setHasMore(true);
    setLoading(false);
  }, [initialConcerts, keyword]);

  if (searchedConcerts.length === 0) {
    return (
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
    );
  }
  return (
    <section className="px-15 py-16">
      <div className="mx-auto flex w-full max-w-400 flex-col gap-8">
        <div className="flex flex-col gap-6">
          {searchedConcerts.map((concert) => (
            <SearchConcertCard key={concert.id} concert={concert} />
          ))}
        </div>
      </div>
      {hasMore && <div ref={oTarget} className="h-1 w-full" aria-hidden="true" />}
    </section>
  );
}
