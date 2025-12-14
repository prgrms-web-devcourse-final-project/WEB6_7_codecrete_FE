import { UserRoundPlusIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function PlannerInviteFriends() {
  return (
    <div className="bg-bg-main border-border border p-6">
      <h4 className="text-base font-bold">친구 초대하기</h4>
      <p>함께 갈 친구들에게 플랜을 공유해보세요</p>
      <ul className="space-y-3">
        <li className="bg-bg-sub flex items-center gap-3 rounded-xl p-4">
          <Avatar className="size-15 ring-0">
            <AvatarImage
              src="https://kopis.or.kr/_next/image?url=%2Fupload%2FpfmPoster%2FPF_PF281383_251211_125646.jpg&w=384&q=75"
              alt="아티스트"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col gap-1">
            <strong className="text-sm font-medium">varYeon</strong>
            <span className="text-xs font-medium">확정</span>
          </div>
          <Checkbox />
        </li>
        <li className="bg-bg-sub flex items-center gap-3 rounded-xl p-4">
          <Avatar className="size-15 ring-0">
            <AvatarImage
              src="https://kopis.or.kr/_next/image?url=%2Fupload%2FpfmPoster%2FPF_PF281383_251211_125646.jpg&w=384&q=75"
              alt="아티스트"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col gap-1">
            <strong className="text-sm font-medium">stupilman</strong>
            <span className="text-xs font-medium">확정</span>
          </div>
          <Checkbox />
        </li>
      </ul>
      <Button variant="outline" className="w-full cursor-pointer">
        <UserRoundPlusIcon />
        친구 초대하기
      </Button>
    </div>
  );
}
