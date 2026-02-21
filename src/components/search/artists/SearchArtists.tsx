"use client";
import { useState, useEffect, useRef } from "react";
import { SearchArtistWithLiked } from "@/types/search";
import SearchArtistCard from "./SearchArtistCard";
import { Loader2Icon } from "lucide-react";
import EmptyContents from "../EmptyContents";

const ITEMS_PER_PAGE = 12;

export default function SearchArtists({ artists }: { artists: SearchArtistWithLiked[] }) {
  const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const displayedArtists = artists.slice(0, displayedCount);
  const hasMore = displayedCount < artists.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setIsLoading(true);
          setTimeout(() => {
            setDisplayedCount((prev) => Math.min(prev + ITEMS_PER_PAGE, artists.length));
            setIsLoading(false);
          }, 300);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoading, artists.length]);

  return (
    <section className="flex flex-col gap-20 px-5 py-7 lg:gap-30 lg:px-15 lg:py-16">
      {displayedArtists.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8 xl:gap-y-10">
            {displayedArtists.map((artist) => (
              <SearchArtistCard key={artist.id} artist={artist} />
            ))}
          </div>

          {hasMore && (
            <div ref={observerTarget} className="flex h-20 items-center justify-center">
              {isLoading && <Loader2Icon className="animate-spin" />}
            </div>
          )}
        </>
      ) : (
        <EmptyContents type="artists" />
      )}
    </section>
  );
}
