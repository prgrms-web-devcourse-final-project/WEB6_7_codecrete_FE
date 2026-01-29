"use client";

import { Button } from "@/components/ui/button";
import ArtistConcertItem from "@/components/artist/detail/ArtistConcertItem";
import { ConcertWithTicket } from "@/types/home";
import { useState } from "react";

export default function ArtistDetailPast({
  pastConcerts,
}: {
  pastConcerts: ConcertWithTicket[] | null;
}) {
  const [showAll, setShowAll] = useState(false);

  const hasConcerts = pastConcerts && pastConcerts.length > 0;
  const hasMoreThanThree = pastConcerts && pastConcerts.length > 3;
  const visibleConcerts = (showAll ? pastConcerts : pastConcerts?.slice(0, 3)) ?? [];

  return (
    <section className={"bg-bg-main px-5 py-8 lg:px-15 lg:py-16"}>
      <div className={"mx-auto flex max-w-400 flex-col gap-4 lg:gap-6"}>
        {/*헤더 및 분류 버튼 파트*/}
        <h2 className={"text-text-main text-xl font-bold lg:text-2xl"}>지난 공연</h2>
        {hasConcerts ? (
          <div className="flex flex-col gap-4">
            {visibleConcerts.map((concert) => (
              <ArtistConcertItem key={concert.id} concert={concert} />
            ))}
          </div>
        ) : (
          <div className="text-text-sub flex h-40 flex-col items-center justify-center gap-2">
            <p className="text-sm">지난 공연이 없습니다.</p>
          </div>
        )}
        {hasMoreThanThree && (
          <div className={"flex justify-center"}>
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
