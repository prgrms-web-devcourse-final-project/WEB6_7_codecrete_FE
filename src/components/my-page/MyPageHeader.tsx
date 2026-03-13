import ProfileNoImage from "@/components/common/ProfileNoImage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar1Icon, CalendarClockIcon, MailIcon } from "lucide-react";
import MyPageSetting from "./MyPageSetting";
import { format } from "date-fns";
import { User } from "@/types/user";

export default function MyPageHeader({
  userData,
  planListCount,
}: {
  userData: User;
  planListCount: number;
}) {
  const formattedDate = format(new Date(userData.createdDate), "yyyy-MM-dd");

  return (
    <header className="bg-zinc-100 px-5 py-10 lg:px-15 lg:py-20 dark:bg-zinc-900">
      <div className="relative mx-auto flex max-w-400 flex-col items-center gap-5 md:flex-row lg:gap-10">
        {/* 이미지 */}
        <div className="relative w-fit">
          <Avatar className="size-30 ring-4 ring-zinc-600 md:size-22 dark:ring-white">
            <AvatarImage src={userData.profileImageUrl} alt="User Photo" />
            <AvatarFallback>
              <ProfileNoImage size="lg" />
            </AvatarFallback>
          </Avatar>
        </div>
        {/* 정보 */}
        <div className="space-y-2 lg:space-y-4">
          <h2 className="text-text-main text-center text-xl font-bold md:text-left md:text-2xl lg:text-4xl">
            {userData.nickname}
          </h2>
          <ul className="flex flex-col gap-x-8 gap-y-1 lg:flex-row">
            <li className="text-text-sub flex items-center gap-2 text-sm dark:text-zinc-300">
              <strong className="flex items-center gap-1 font-semibold">
                <MailIcon size={16} />
                가입 이메일
              </strong>
              <p>{userData.email}</p>
            </li>
            <li className="text-text-sub flex items-center gap-2 text-sm dark:text-zinc-300">
              <strong className="flex items-center gap-1 font-semibold">
                <Calendar1Icon size={16} />
                가입일
              </strong>
              <p>{formattedDate}</p>
            </li>
            <li className="text-text-sub flex items-center gap-2 text-sm dark:text-zinc-300">
              <strong className="flex items-center gap-1 font-semibold">
                <CalendarClockIcon size={16} />
                예정된 일정
              </strong>
              <p>{planListCount}개</p>
            </li>
          </ul>
        </div>
        <MyPageSetting userData={userData} />
      </div>
    </header>
  );
}
