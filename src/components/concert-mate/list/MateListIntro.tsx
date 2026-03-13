import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAuthStatus } from "@/lib/api/auth/auth.server";
import PageHeader from "@/components/common/PageHeader";

export default async function MateListIntro() {
  const isLoggedIn = await getAuthStatus();

  return (
    <>
      {/* TODO : 검색 기능 구현
          <SearchInput className="w-[60%]" />
          */}
      <PageHeader
        title="공연 동행 찾기"
        description="다가오는 콘서트를 함께 즐길 Mate 를 찾아보세요."
      >
        {isLoggedIn && (
          <Link href="/concert-mate/write">
            <Button variant="default" size="lg" className="bg-point-main cursor-pointer">
              글쓰기
            </Button>
          </Link>
        )}
      </PageHeader>
    </>
  );
}
