import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { getAuthStatus } from "@/lib/api/auth/auth.server";

export default async function MateListIntro() {
  const isLoggedIn = await getAuthStatus();

  return (
    <section className="intro bg-bg-sub px-15 py-16">
      <div className={twMerge(`mx-auto flex w-full max-w-400 flex-col gap-8`)}>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-text-sub text-md">Community</p>
            <h2 className="text-text-main text-4xl font-bold">공연 동행 찾기</h2>
            <p className="text-text-sub text-md">다가오는 콘서트를 함께 즐길 Mate 를 찾아보세요.</p>
          </div>
          {isLoggedIn && (
            <Link href="/concert-mate/write">
              <Button variant="default" size="lg" className="bg-point-main cursor-pointer">
                <Plus /> 글 작성하기
              </Button>
            </Link>
          )}
        </div>
        {/* TODO : 검색 기능 구현
        <SearchInput className="w-[60%]" />
        */}
      </div>
    </section>
  );
}
