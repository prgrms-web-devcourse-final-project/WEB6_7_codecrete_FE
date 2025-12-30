"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export default function SearchNavigation() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const searchTabs = [
    { id: "overview", label: "전체보기", href: "/search/overview" },
    { id: "artists", label: "아티스트", href: "/search/artists" },
    { id: "concerts", label: "공연", href: "/search/concerts" },
  ];

  const pathname = usePathname();

  return (
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
                <p className="text-sm font-normal">(12)</p>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
