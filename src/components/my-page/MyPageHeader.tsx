import ProfileNoImage from "@/components/common/ProfileNoImage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarClockIcon, TicketIcon } from "lucide-react";
import MyPageSetting from "./MyPageSetting";

export default function MyPageHeader() {
  return (
    <header className="bg-zinc-900 px-15 py-20">
      <div className="mx-auto flex max-w-400 gap-10">
        <div className="relative w-fit">
          <Avatar className="size-30">
            <AvatarImage src="/user-photo.png" alt="User Photo" />
            <AvatarFallback>
              <ProfileNoImage size="lg" />
            </AvatarFallback>
          </Avatar>
          <MyPageSetting />
        </div>
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-white">상아영혼방패</h2>
          <p className="text-base font-medium text-zinc-300">garlatonic@kakao.com</p>
          <ul className="flex gap-4">
            <li className="flex items-center gap-2 text-base text-zinc-300">
              <strong className="flex items-center gap-1">
                <TicketIcon size={16} className="fill-zinc-300" />
                가입일
              </strong>
              <p>2025-12-08</p>
            </li>
            <li className="flex items-center gap-2 text-base text-zinc-300">
              <strong className="flex items-center gap-1">
                <CalendarClockIcon size={16} />
                예정된 일정
              </strong>
              <p>8개</p>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
