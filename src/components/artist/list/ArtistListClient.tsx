"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ArtistListFilters from "@/components/artist/list/ArtistListFilters";
import ArtistListItems from "@/components/artist/list/ArtistListItems";
import { getArtists } from "@/lib/artists/artists.client";
import { ArtistListContent } from "@/types/artists";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ArtistListClient({
  initialArtists,
  initialSort,
}: {
  initialArtists: ArtistListContent[];
  initialSort: string;
}) {
  const [artists, setArtists] = useState(initialArtists);
  const [sort, setSort] = useState(initialSort);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialArtists.length >= 20);

  const observeRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleSortChange = async (value: string) => {
    setSort(value);
    setPage(0);
    setHasMore(true);

    router.replace(`?sort=${value}`);

    const nextArtists = await getArtists(0, 20, value);
    setArtists(nextArtists);
  };

  const fetchNextPage = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const nextPage = page + 1;
      const nextArtists = await getArtists(nextPage, 20, sort);

      setArtists((prev) => [...prev, ...nextArtists]);
      setPage(nextPage);

      if (nextArtists.length < 20) {
        setHasMore(false);
      }
    } catch (e) {
      console.error("무한 스크롤 데이터 페칭 에러:", e);
      toast.error("데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, [page, sort, isLoading, hasMore]);

  useEffect(() => {
    const currentTarget = observeRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        // entries[0]이 화면에 보이고(isIntersecting), 데이터가 더 있다면(hasMore) 실행
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
      observer.disconnect();
    };
  }, [fetchNextPage, hasMore, isLoading]);

  return (
    <>
      <ArtistListFilters onSortChange={handleSortChange} currentSort={sort} />
      <ArtistListItems artists={artists} />

      <div ref={observeRef} className="flex min-h-[100px] justify-center py-10">
        {isLoading && <Loader2 className="text-primary h-8 w-8 animate-spin" />}
        {!hasMore && artists.length > 0 && toast.info("모든 아티스트를 불러왔습니다.")}
      </div>
    </>
  );
}
