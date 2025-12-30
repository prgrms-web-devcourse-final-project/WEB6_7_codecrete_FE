"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";
import ConcertCard from "@/components/concert/ConcertCard";
import ListSortClient from "@/components/concert/list/ListSortClient";
import { getNoTicketTimeLists } from "@/lib/api/admin/admin.client";
import { ConcertData } from "@/types/concerts";

export default function AdminConcertListContent({ initialList }: { initialList: ConcertData[] }) {
  const [concertsList, setConcertsList] = useState<ConcertData[]>(initialList);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const oTarget = useRef<HTMLDivElement | null>(null);
  const pageRef = useRef(1);

  // 12개씩 추가 로드
  const loadMoreList = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const res = await getNoTicketTimeLists({
        page: pageRef.current,
        size: 12,
      });

      const addList: ConcertData[] = res ?? [];

      // 아예 없으면 종료
      if (!addList || addList.length === 0) {
        setHasMore(false);
        toast.success("모든 공연을 불러왔습니다.");
        return;
      }

      setConcertsList((prev) => {
        // 중복 제거
        const uniqueAddList = addList.filter(
          (addItem) => !prev.some((prevItem) => prevItem.id === addItem.id)
        );

        // 추가할 게 없으면 더 안 불러옴
        if (uniqueAddList.length === 0) {
          setHasMore(false);
          return prev;
        }

        return [...prev, ...uniqueAddList];
      });

      pageRef.current += 1;

      // 12개 미만이면 마지막 페이지
      if (addList.length < 12) {
        setHasMore(false);
        toast.success("모든 공연을 불러왔습니다.");
      }
    } catch (error) {
      console.error(error);
      toast.error("데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  }, [hasMore, loading]);

  // IntersectionObserver
  useEffect(() => {
    if (!oTarget.current || !hasMore) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading && hasMore) {
          loadMoreList();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      }
    );

    obs.observe(oTarget.current);

    return () => {
      obs.disconnect();
    };
  }, [hasMore, loading, loadMoreList]);

  useEffect(() => {
    setConcertsList(initialList);
    pageRef.current = 1;
    setHasMore(true);
    setLoading(false);
  }, [initialList]);

  return (
    <section className="px-15 py-16">
      <div className={twMerge("mx-auto flex w-full max-w-400 flex-col gap-9")}>
        <div className="header flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-text-main text-2xl font-bold">{concertsList.length}</span>
            <span className="text-text-main text-lg">items</span>
          </div>
          <ListSortClient />
        </div>

        <div className="list grid gap-8 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {concertsList.map((concert) => (
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

        {loading && (
          <div className="text-text-sub flex items-center justify-center pb-6 text-sm">
            불러오는 중입니다...
          </div>
        )}
      </div>

      {hasMore && <div ref={oTarget} className="h-1 w-full" aria-hidden="true" />}
    </section>
  );
}
