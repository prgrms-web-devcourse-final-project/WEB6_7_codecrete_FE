import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function MateListCard() {
  return (
    <Link href="concert-mate/1">
      <div
        className={twMerge(
          `border-border hover:border-border-point flex flex-col gap-4 rounded-2xl border p-6`
        )}
      >
        <div className="profile flex justify-between">
          <div className="flex gap-4">
            <Avatar className="ring-border size-10 ring-4">
              <AvatarImage
                src="https://kopis.or.kr/_next/image?url=%2Fupload%2FpfmPoster%2FPF_PF281383_251211_125646.jpg&w=384&q=75"
                alt="아티스트"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <strong className="text-text-main text-lg">김철수</strong>
              <div className="flex items-center gap-2">
                <p className="text-text-sub text-sm">2025-12-15</p>
              </div>
            </div>
          </div>
        </div>
        <div className={twMerge(`content flex flex-col gap-2 px-16`)}>
          <h2 className="text-text-main text-lg font-bold">
            2025 Christmas Concert 같이 갈 사람 구해요
          </h2>
          <div className={twMerge(`bg-bg-sub flex justify-between rounded-lg p-3`)}>
            <div>
              <strong className="text-text-main text-sm">2025 Christmas Concert</strong>
              <p className="text-text-sub text-sm">KSPO DOME · 2025-12-24</p>
            </div>
            {/* TODO : 뱃지 너비 확인 */}
            <Badge className={twMerge(`bg-point-main text-text-point-main mr-2 text-xs`)}>
              Rock
            </Badge>
          </div>
          <p className="text-text-sub text-sm">
            안녕하세여 올해 솔크를 보낼 김뚫꽉 입니다. 솔크 기념 뭐하고 놀까 하다가 이 콘서트를 알게
            되었어요. 최고의 크리스마스를 위해 방문합니다! 저랑 함께 크리스마스와 공연을 즐기실 분이
            있을까요? 우리 같이 공연 전에 만나서 굿즈도 구매하고, 사진도 찍고, 밥도 먹으면서 콘서트
            대화 나눠요! 크리스마스 핑계를 댔지만 사실 저는 BB의 엄청난 빅팬이랍니다! 같이 BB에
            대해서 대화를 나눌 수 있으면 좋겠어요~~ 글씨 칸이 너무 길쭉한거 같지 않나요...? 뭔가
            되게 어색한거 같은데 기분탓인지 뭔지....이게 2000px 화면으로 뒀더니 아무리 써도 3번째
            줄까지 도달하기가 힘드네요 너무 졸려요
          </p>
        </div>
        <div className="reaction flex gap-4 px-16">
          <button className="text-text-sub flex items-center gap-1 text-sm">
            <Heart className="h-4 w-4" />
            <p>52</p>
          </button>
          <button className="text-text-sub flex items-center gap-1 text-sm">
            <MessageCircle className="h-4 w-4" />
            <p>12</p>
          </button>
          <button className="text-text-sub flex items-center gap-1 text-sm">
            <Share2 className="h-4 w-4" />
            <p>12</p>
          </button>
        </div>
      </div>
    </Link>
  );
}
