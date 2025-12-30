"use client";

import ConcertCard from "@/components/concert/ConcertCard";
import { twMerge } from "tailwind-merge";
import ListSortClient from "@/components/concert/list/ListSortClient";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { totalConcertCount } from "@/lib/api/concerts.server";
import { ConcertData } from "@/types/concerts";

export default function ConcertListContent({
  initialList,
  sortType = "LIKE",
}: {
  initialList: ConcertData[];
  sortType?: string;
}) {
  const [concertsList, setConcertsList] = useState(initialList);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState<number | null>(null);

  const oTarget = useRef(null);
  const pageRef = useRef(1); // 0 시작 이므로

  const loadMoreList = useCallback(async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/concerts/list/${sortType}?page=${pageRef.current}&size=12`
      );

      if (!res.ok) {
        throw new Error("데이터 패치 실패");
      }

      const result = await res.json();
      const addList = result.data;

      if (addList.length > 0) {
        setConcertsList((prev) => {
          const uniqueAddList = addList.filter(
            (addItem: ConcertData) => !prev.some((prevItem) => prevItem.id === addItem.id)
          );

          return [...prev, ...uniqueAddList];
        });
        pageRef.current += 1;
      }
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
  }, [sortType]);

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
    setConcertsList(initialList);
    pageRef.current = 1;
    setHasMore(true);
    setLoading(false);
  }, [initialList, sortType]);

  useEffect(() => {
    const fetchTotalCount = async () => {
      const count = await totalConcertCount();
      if (count !== null) {
        setTotalCount(count);
      }
    };

    fetchTotalCount();
  }, []);

  return (
    <section className="px-15 py-16">
      <div className={twMerge(`mx-auto flex w-full max-w-400 flex-col gap-9`)}>
        <div className="header flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-text-main text-2xl font-bold">
              {totalCount ?? concertsList.length}
            </span>
            <span className="text-text-main text-lg">items</span>
          </div>
          {/* TODO : 정렬 API 수정 따라 수정 */}
          <ListSortClient />
        </div>
        <div className="list grid gap-8 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* TODO : 가끔 12개씩 안 불러지는 오류 해결 */}
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
      {hasMore && <div ref={oTarget} className="h-1 w-full" aria-hidden="true" />}
    </section>
  );
}
