import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MyPageLikedArtistListItem() {
  return (
    <Link href="artists/1">
      <Card className="items-center p-8 text-center shadow-none">
        <Avatar className="ring-border size-30 ring-4">
          <AvatarImage
            src="https://kopis.or.kr/_next/image?url=%2Fupload%2FpfmPoster%2FPF_PF281383_251211_125646.jpg&w=384&q=75"
            alt="아티스트"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="">
          <h3 className="text-text-main text-lg font-bold">먼데이키즈</h3>
          <p className="text-text-sub text-sm font-semibold">발라드 가수</p>
        </div>
        <div className="text-text-sub flex items-center gap-2 text-sm font-semibold">
          <UsersRound size={12} strokeWidth={3} />
          <p>24.5K 팔로우 중</p>
        </div>
        <Button variant="default" size="lg" className="w-full">
          팔로우
        </Button>
      </Card>
    </Link>
  );
}
