import { LogInIcon, User2Icon, UserPlus2Icon } from "lucide-react";
import { getAuthStatus, getMe } from "@/lib/auth/auth.server";
import LogoutButton from "@/components/home/LogoutButton";
import Logo from "./Logo";
import IconLink from "./IconLink";
import Navigation from "./Navigation";
import SearchModal from "../SearchModal";

export default async function Header() {
  const isLoggedIn = await getAuthStatus();
  let isAdmin = false;

  if (isLoggedIn) {
    const userData = (await getMe()).data;
    isAdmin = userData?.role === "ADMIN";
  }

  return (
    <header className="border-border bg-bg-main sticky -top-12 left-0 z-50 border-b px-5 lg:-top-21 lg:px-15">
      <div className="mx-auto w-full max-w-400 space-y-4 py-4 lg:space-y-8 lg:py-8">
        {/* 상단 바 */}
        <div className="flex items-center justify-between gap-1 lg:gap-4">
          {/* 로고 & 검색 */}
          <div className="flex flex-1 items-center justify-between gap-4 lg:justify-start lg:gap-10">
            <Logo />
            <SearchModal />
          </div>
          {/* 로그인 액션 */}
          {isLoggedIn && (
            <div className="flex gap-1 text-zinc-500 lg:gap-8">
              <LogoutButton />
              <IconLink href="/my-page/overview" icon={User2Icon} label="마이페이지" />
            </div>
          )}
          {!isLoggedIn && (
            <div className="flex gap-1 text-zinc-500 lg:gap-8">
              <IconLink href="/sign-in" icon={LogInIcon} label="로그인" />
              <IconLink href="/sign-up" icon={UserPlus2Icon} label="회원가입" />
            </div>
          )}
        </div>

        {/* 내비게이션 */}
        <Navigation isAdmin={isAdmin} />
      </div>
    </header>
  );
}
