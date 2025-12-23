import { Search } from "lucide-react";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import { getAuthStatus } from "@/lib/auth/auth.server";
import LogoutButton from "@/components/home/LogoutButton";

export default async function Header() {
  const isLoggedIn = await getAuthStatus();

  const navLinkHover =
    "relative inline-block transition-all duration-300 ease-in-out text-text-main hover:-translate-y-0.5 before:absolute before:-bottom-0.5 before:left-0 before:right-0 before:-z-10 before:h-0.5 before:bg-border-point before:origin-bottom before:scale-y-0 before:transform before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-y-100";

  return (
    <header className="border-border bg-bg-main sticky -top-21 left-0 z-50 flex w-full justify-center border-b px-15">
      <div className="w-full max-w-400 space-y-8 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            <h1>
              <Link href="/home" className="dark:brightness-0 dark:invert">
                <Image src="/logo_b.svg" alt="NCB Ticket" width={329} height={64} />
              </Link>
            </h1>
            <div className="relative w-full max-w-md">
              <Search
                size={16}
                className="absolute top-1/2 left-6 -translate-y-1/2 stroke-zinc-500"
              />
              <Input
                placeholder="좋아하는 가수를 검색해보세요."
                className="border-border bg-bg-sub h-13 rounded-4xl pr-4 pl-14 font-medium"
              />
            </div>
          </div>
          {/* 로그인 상태에 따라 다른 메뉴 표시 */}
          <div className="space-x-8 text-zinc-500">
            {isLoggedIn ? (
              <>
                <LogoutButton />
                <Link className="hover:font-medium" href="/my-page/overview">
                  마이페이지
                </Link>
              </>
            ) : (
              <>
                <Link className="hover:font-medium" href="/sign-in">
                  로그인
                </Link>
                <Link className="hover:font-medium" href="/sign-up">
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
        <nav className="space-x-15 text-xl font-semibold text-zinc-900">
          <Link href="/concerts" className={navLinkHover}>
            공연
          </Link>
          <Link href="/artists" className={navLinkHover}>
            아티스트
          </Link>
          <Link href="/concert-mate" className={navLinkHover}>
            동행구인
          </Link>
          <Link href="/planner" className={navLinkHover}>
            외출플래너
          </Link>
        </nav>
      </div>
    </header>
  );
}
