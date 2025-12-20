"use client";

import ConcertCard from "@/components/concert/ConcertCard";
import { twMerge } from "tailwind-merge";
import { ConcertData } from "@/components/concert/ConcertType";
import ListSortClient from "@/components/concert/list/ListSortClient";
import { useCallback, useEffect, useRef, useState } from "react";

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

  const oTarget = useRef(null);
  const pageRef = useRef(2);

  const loadMoreList = useCallback(async () => {
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

        if (addList.length < 12) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error(error);
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

  return (
    <section className="px-15 py-16">
      <div className={twMerge(`mx-auto flex w-full max-w-400 flex-col gap-9`)}>
        <div className="header flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-text-main text-2xl font-bold">{concertsList.length}</span>
            <span className="text-text-main text-lg">items</span>
          </div>
          <ListSortClient />
        </div>
        <div className="list grid gap-8 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
      {hasMore && <div ref={oTarget}></div>}
    </section>
  );
}
