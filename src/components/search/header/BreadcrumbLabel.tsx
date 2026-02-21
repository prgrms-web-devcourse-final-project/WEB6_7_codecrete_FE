"use client";

import { usePathname } from "next/navigation";

const tapMap = [
  { href: "/search/overview", label: "전체보기" },
  { href: "/search/artists", label: "아티스트" },
  { href: "/search/concerts", label: "공연" },
];

export default function BreadcrumbLabel() {
  const pathname = usePathname();
  const currentTab = tapMap.find((tap) => pathname === tap.href);
  const currentLabel = currentTab ? currentTab.label : "";

  return <>{currentLabel}</>;
}
