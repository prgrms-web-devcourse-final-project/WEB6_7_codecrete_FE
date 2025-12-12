import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Input } from "@/components/ui/input";

export default function Header() {
  return (
    <header className="border-border bg-bg-main sticky -top-21 left-0 z-50 flex w-full justify-center border-b">
      <div className="w-full max-w-400 space-y-8 px-15 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            <h1>
              <Link href="/home">
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
          {/* TODO: 유저 로그인 여부 확인 후 토글 */}
          {/* 비회원일 때 */}
          <div className="space-x-8 text-zinc-500">
            <Link className="hover:font-medium" href="/login">
              로그인
            </Link>
            <Link className="hover:font-medium" href="/signup">
              회원가입
            </Link>
          </div>
          {/* 회원일 때 */}
          {/* <div>
            <Link className="hover:font-medium" href="/sign-in">로그인</Link>
            <Link className="hover:font-medium" href="/sign-up">회원가입</Link>
          </div> */}
        </div>
        <nav className="space-x-15 text-xl font-semibold text-zinc-900">
          <Link href="/concerts" className="nav-link-hover">
            공연
          </Link>
          <Link href="/artists" className="nav-link-hover">
            아티스트
          </Link>
          <Link href="/review" className="nav-link-hover">
            공연후기
          </Link>
          <Link href="/concert-mate" className="nav-link-hover">
            동행구인
          </Link>
          <Link href="/planner" className="nav-link-hover">
            외출플래너
          </Link>
        </nav>
      </div>
    </header>
  );
}
