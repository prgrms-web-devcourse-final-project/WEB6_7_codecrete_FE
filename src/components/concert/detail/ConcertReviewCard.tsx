import { twMerge } from "tailwind-merge";
import { Badge } from "@/components/ui/badge";
import { Heart, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function ConcertReviewCard() {
  return (
    <Link href="#">
      <div
        className={twMerge(
          `border-border flex cursor-pointer flex-col gap-4 rounded-xl border-2 p-6`
        )}
      >
        <div className="flex justify-between">
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
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      className="cursor-pointer"
                      aria-label={`${index + 1}점`}
                    >
                      <Star
                        className="text-text-main h-4 w-4"
                        fill={index < 4 ? "currentColor" : "none"}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-text-sub text-sm">2주 전</p>
              </div>
            </div>
          </div>
          <div className="text-text-sub flex items-center gap-0.5 text-sm">
            <Heart className="h-4 w-4" />
            <p>52</p>
          </div>
        </div>

        <p className="text-text-sub">
          아 공연 대박 재밌었어요. 다음에 또 열어주실거죠? 정말 기대했는데, 최고에요. 최고의 공연.
          무대를 뒤집어놓으셨다. 선배님 짱. 아무 내용이나 추가할게요. 아무 내용 아무 내용 아무 내용
          아무 내용 아무 내용
        </p>

        <div>
          <Badge className="bg-border text-text-main mr-2 text-sm">최고의 퍼포먼스</Badge>
          <Badge className="bg-border text-text-main mr-2 text-sm">좋은 공연장</Badge>
        </div>
      </div>
    </Link>
  );
}
