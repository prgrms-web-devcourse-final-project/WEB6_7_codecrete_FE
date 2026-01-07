"use client";

import ArtistConcertItem from "@/components/artist/detail/ArtistConcertItem";
import { ConcertWithTicket } from "@/types/home";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ArtistDetailUpcoming({
  upComingConcerts,
}: {
  upComingConcerts: ConcertWithTicket[] | null;
}) {
  const [showAll, setShowAll] = useState(false);

  const hasConcerts = upComingConcerts && upComingConcerts.length > 0;
  const hasMoreThanThree = upComingConcerts && upComingConcerts.length > 3;
  const visibleConcerts = (showAll ? upComingConcerts : upComingConcerts?.slice(0, 3)) ?? [];
  return (
    <section className={"bg-bg-sub px-15 py-16"}>
      <div className={"mx-auto flex max-w-400 flex-col gap-8"}>
        {/*헤더 및 분류 버튼 파트*/}
        <div className={"flex justify-between"}>
          <h2 className={"text-3xl font-bold"}>예정된 공연</h2>
        </div>
        {hasConcerts ? (
          <div className="flex flex-col gap-4">
            {visibleConcerts.map((concert) => (
              <ArtistConcertItem key={concert.id} concert={concert} />
            ))}
          </div>
        ) : (
          <div className="text-text-sub flex h-40 flex-col items-center justify-center gap-2">
            <p className="text-sm">예정된 공연이 없습니다.</p>
          </div>
        )}
        {hasMoreThanThree && (
          <div className={"flex justify-center"}>
            {/*콘서트 로더 버튼 파트*/}
            <Button
              size={"lg"}
              variant={"outline"}
              className={"border-border cursor-pointer border-2"}
              type={"button"}
              onClick={() => setShowAll((prev) => !prev)}
            >
              <span className={"font-bold"}>{showAll ? "접기" : "전체 공연 보기"}</span>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
