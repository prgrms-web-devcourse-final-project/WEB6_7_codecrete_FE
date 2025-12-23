"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { twMerge } from "tailwind-merge";
import { ArrowUpIcon } from "lucide-react";

export default function TopButton() {
  const [isVisible, setIsVisible] = useState(false);

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
        "fixed right-10 bottom-10 z-90 size-15! rounded-full transition-opacity duration-300",
        isVisible ? "opacity-100" : "pointer-events-none opacity-0"
      )}
      onClick={handleScrollToTop}
    >
      <ArrowUpIcon className="size-7" />
    </Button>
  );
}
