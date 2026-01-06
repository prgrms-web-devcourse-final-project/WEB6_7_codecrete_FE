"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export default function MyPageNavigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/my-page/overview", label: "전체보기" },
    { href: "/my-page/likes", label: "좋아요" },
    { href: "/my-page/board", label: "내 글" },
  ];

  return (
    <div className="border-border border-y px-5 lg:px-15">
      <nav className="m-auto flex w-full max-w-400 gap-8">
        {navItems.map(({ href, label }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={twMerge(
                "border-b-2 border-transparent py-4 text-base transition-colors",
                isActive
                  ? "border-point-main text-text-main font-bold"
                  : "text-text-sub hover:text-text-main"
              )}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
