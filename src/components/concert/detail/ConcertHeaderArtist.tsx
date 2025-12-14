import { twMerge } from "tailwind-merge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Music, Users } from "lucide-react";

export default function ConcertHeaderArtist() {
  return (
    <div className="about-Artist flex flex-col gap-4">
      <strong className="text-xl">아티스트 정보</strong>
      <div className="flex justify-between">
        <div className="flex gap-4">
          <Avatar className="ring-border size-20 ring-4">
            <AvatarImage
              src="https://kopis.or.kr/_next/image?url=%2Fupload%2FpfmPoster%2FPF_PF281383_251211_125646.jpg&w=384&q=75"
              alt="아티스트"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <strong className="text-lg">변수연 밴드</strong>
            <p className="text-text-sub">Alternative Rock Band • Est. 2018</p>
            <div className={twMerge(`text-text-sub text-md flex items-center gap-2`)}>
              <Users className="h-4 w-4" />
              <p>2.4M follower</p>
              <Music className="h-4 w-4" />
              <p>4 Albums</p>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="border-border-point hover:bg-border px-4 py-2"
        >
          Follow
        </Button>
      </div>
      <p className="text-text-sub">
        안녕하세요 저희가 크리스마스에 콘서트를 엽니다. 크리스마스에 큰 약속이 없거나, 특별한
        데이트를 하고 싶거나, 친구들과 즐거운 추억을 만들고 싶은 분이 계시다면 저희 콘서트를
        방문해주세요. 저는 지금 긴 글이 필요합니다. 윤도현 밴드, 유다빈 밴드의 뒤를 이을 변수연 밴드
        통칭 BB. 얼굴에 바르시면 안 됩니다. 아무래도 화장품은 아니구요. 오늘은 눈비가 오네요. 춥긴
        한데 옷을 답지 않게 따뜻하게 입었더니 자꾸 덥네요. 몸은 더운데 얼굴은 추운 그거 아시나요?
        마스크를 쓰고 5분 정도 걸었더니 제 뜨거운 입김에 속눈썹과 옆 더듬이가 촉촉해지더군요. 아마도
        조금 더 추웠으면 꽝꽝 얼어버렸을지도 몰라요. 조금 위험하네요. 이 정도 길이면 충분한거
        같아요. 감기 조심하세요. 메리 크리스마스.
      </p>
    </div>
  );
}
