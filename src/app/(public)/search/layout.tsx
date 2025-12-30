import SearchIntroSkeleton from "@/components/loading/search/SearchIntroSkeleton";
import SearchNavigationSkeleton from "@/components/loading/search/SearchNavigationSkeleton";
import BreadcrumbNavbar from "@/components/review/BreadcrumbNavbar";
import BreadcrumbLabel from "@/components/search/BreadcrumbLabel";
import SearchIntro from "@/components/search/SearchIntro";
import SearchNavigation from "@/components/search/SearchNavigation";
import { Suspense } from "react";

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbNavbar
        items={[
          { label: "홈", href: "/" },
          { label: "검색 결과", href: "/search/overview" },
          { label: <BreadcrumbLabel /> },
        ]}
      />
      <Suspense fallback={<SearchIntroSkeleton />}>
        <SearchIntro />
      </Suspense>
      <Suspense fallback={<SearchNavigationSkeleton />}>
        <SearchNavigation />
      </Suspense>
      {children}
    </>
  );
}
