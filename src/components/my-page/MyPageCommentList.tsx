import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { HeartIcon } from "lucide-react";
import ProfileNoImage from "../common/ProfileNoImage";
import { Button } from "../ui/button";

export default function MyPageCommentList() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <Link
          key={index}
          href="#"
          className="border-border flex cursor-pointer justify-between gap-4 rounded-xl border p-6"
        >
          <div className="flex justify-between">
            <Avatar className="size-10">
              <AvatarImage
                src="https://kopis.or.kr/_next/image?url=%2Fupload%2FpfmPoster%2FPF_PF281383_251211_125646.jpg&w=384&q=75"
                alt="아티스트"
              />
              <AvatarFallback>
                <ProfileNoImage size="sm" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 space-y-4">
            <div className="space-y-1">
              <strong className="text-text-main text-base font-semibold">김철수</strong>
              <p className="text-text-sub text-xs">2주 전</p>
            </div>
            <div className="space-y-2">
              <p className="text-text-sub line-clamp-3">댓글이라네요 댓글</p>
            </div>
            <div className="text-text-sub flex gap-4">
              <Button variant="ghost" className="h-auto p-0! hover:bg-transparent">
                <HeartIcon size={16} />
                16
              </Button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
