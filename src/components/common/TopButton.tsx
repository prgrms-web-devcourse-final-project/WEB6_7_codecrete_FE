"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { twMerge } from "tailwind-merge";
import { ArrowUpIcon } from "lucide-react";
import { usePathname } from "next/navigation";

export default function TopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      size="icon"
      className={twMerge(
        "fixed right-6 bottom-6 z-50 size-12! rounded-full transition-opacity duration-300",
        pathname.startsWith("/planner") && "bottom-34",
        pathname.startsWith("/concerts/") && "bottom-20",
        isVisible ? "opacity-100" : "pointer-events-none opacity-0",
        "lg:right-10 lg:bottom-10 lg:size-15!"
      )}
      onClick={handleScrollToTop}
    >
      <ArrowUpIcon className="size-5 lg:size-7" />
    </Button>
  );
}
