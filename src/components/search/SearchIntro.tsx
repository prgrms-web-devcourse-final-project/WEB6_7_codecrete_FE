"use client";

import { getSearchArtistsWithLiked, getSearchConcertsCount } from "@/lib/api/search/search.client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import SearchIntroSkeleton from "../loading/search/SearchIntroSkeleton";

export default function SearchIntro() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const [isPending, startTransition] = useTransition();
  const [artistsCount, setArtistsCount] = useState(0);
  const [concertsCount, setConcertsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    startTransition(async () => {
      const artists = await getSearchArtistsWithLiked({ artistName: keyword });
      setArtistsCount(artists.length);
      const concertsCount = await getSearchConcertsCount({ keyword });
      setConcertsCount(concertsCount);
      setIsLoading(false);
    });
  }, [keyword]);

  return (
    <>
      {isPending || isLoading ? (
        <SearchIntroSkeleton />
      ) : (
        <section className="bg-bg-sub px-15 py-16">
          <div className="mx-auto flex w-full max-w-400 flex-col gap-4">
            <h2 className="text-text-main text-4xl font-bold">검색 결과</h2>
            <p className="text-text-sub text-base">
              <span className="text-point-main">&quot;{keyword}&quot;</span>에 대한
              <span className="text-point-main ml-1">{artistsCount + concertsCount}개</span>의
              결과를 찾았습니다.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
