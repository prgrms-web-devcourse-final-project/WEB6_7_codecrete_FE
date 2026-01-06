"use client";
import { getSearchArtistsWithLiked, getSearchConcertsCount } from "@/lib/api/search/search.client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { twMerge } from "tailwind-merge";
import SearchNavigationSkeleton from "../loading/search/SearchNavigationSkeleton";

export default function SearchNavigation() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);
  const [artistsCount, setArtistsCount] = useState(0);
  const [concertsCount, setConcertsCount] = useState(0);

  useEffect(() => {
    startTransition(async () => {
      const artists = await getSearchArtistsWithLiked({ artistName: keyword });
      setArtistsCount(artists.length);
      const concertsCount = await getSearchConcertsCount({ keyword });
      setConcertsCount(concertsCount);
      setIsLoading(false);
    });
  }, [keyword]);

  const searchTabs = [
    {
      id: "overview",
      label: "전체보기",
      href: "/search/overview",
      count: artistsCount + concertsCount,
    },
    { id: "artists", label: "아티스트", href: "/search/artists", count: artistsCount },
    { id: "concerts", label: "공연", href: "/search/concerts", count: concertsCount },
  ];

  const pathname = usePathname();

  return (
    <>
      {isPending || isLoading ? (
        <SearchNavigationSkeleton />
      ) : (
        <nav className="border-border border-y px-15">
          <div className="mx-auto flex w-full max-w-400 gap-8">
            {searchTabs.map((tab) => {
              const isActive = pathname === tab.href;

              return (
                <Link key={tab.id} href={`${tab.href}?keyword=${keyword}`}>
                  <div
                    className={twMerge(
                      `flex cursor-pointer gap-1 py-4 text-sm`,
                      isActive
                        ? "border-border-point text-text-main border-b-2 font-semibold"
                        : "text-text-sub"
                    )}
                  >
                    {tab.label}
                    <p className="text-sm font-normal">({tab.count})</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
}
