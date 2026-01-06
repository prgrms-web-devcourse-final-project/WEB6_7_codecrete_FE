"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserInfo } from "@/types/user";
import ProfileNoImage from "@/components/common/ProfileNoImage";

export default function MeetingAuthorCard({ userDetail }: { userDetail: UserInfo }) {
  // const [isLoading, setIsLoading] = useState(true);
  // TODO : 스켈레톤 구현
  // if (isLoading) {
  //   return (
  //     <Card className={"flex flex-col gap-4 p-6"}>
  //       {/* 타이틀은 고정해서 사용자가 어떤 영역인지 알게 합니다 */}
  //       <CardTitle>작성자 정보</CardTitle>

  //       <div className={"flex animate-pulse gap-4"}>
  //         {/* 아바타 스켈레톤: 원형(rounded-full)과 크기(h-16 w-16) 유지 */}
  //         <div className="h-16 w-16 rounded-full bg-gray-200" />

  //         {/* 닉네임 스켈레톤: 중앙 정렬(justify-center) 유지 */}
  //         <div className={"flex flex-col justify-center"}>
  //           <div className="h-5 w-24 rounded bg-gray-200" />
  //         </div>
  //       </div>
  //     </Card>
  //   );
  // }

  if (!userDetail) return null;

  return (
    <Card className={"flex flex-col gap-4 p-6"}>
      <CardTitle>작성자 정보</CardTitle>
      <div className={"flex gap-4"}>
        <Avatar className={"h-16 w-16"}>
          <AvatarImage src={userDetail.profileImageUrl} alt={userDetail.nickname} />
          <AvatarFallback>
            <ProfileNoImage size="xs" />
          </AvatarFallback>
        </Avatar>
        <div className={"flex flex-col justify-center"}>
          <span>{userDetail.nickname}</span>
        </div>
      </div>
    </Card>
  );
}
