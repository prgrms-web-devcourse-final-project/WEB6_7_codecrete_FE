"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { twMerge } from "tailwind-merge";
import { ArrowUpIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useThrottle } from "@/hooks/useThrottle";

export default function TopButton() {
  const [scrollY, setScrollY] = useState(0);
  const pathname = usePathname();

  const throttledScrollY = useThrottle(scrollY, 100);
  const isVisible = throttledScrollY > 0;

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      size="icon"
      className={twMerge(
        "fixed right-6 bottom-6 z-50 size-12! rounded-full transition-opacity duration-300",
        pathname.startsWith("/planner") && "bottom-34",
        pathname.startsWith("/concerts/") && "bottom-20",
        pathname.startsWith("/artists/") && "bottom-20",
        pathname.startsWith("/concert-mate/") && "bottom-20",
        isVisible ? "opacity-100" : "pointer-events-none opacity-0",
        "lg:right-10 lg:bottom-10 lg:size-15!"
      )}
      onClick={handleScrollToTop}
    >
      <ArrowUpIcon className="size-5 lg:size-7" />
    </Button>
  );
}
