import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { HeartIcon, MessageCircleIcon, Star } from "lucide-react";
import ProfileNoImage from "../common/ProfileNoImage";
import { Button } from "../ui/button";

export default function MyPagePostList() {
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
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <strong className="text-text-main text-base font-semibold">김철수</strong>
                <p className="text-text-sub text-xs">2주 전</p>
              </div>
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
                        className="text-text-main size-3"
                        fill={index < 4 ? "currentColor" : "none"}
                      />
                    </button>
                  ))}
                </div>
                <span>5.0</span>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-text-main text-lg font-bold">잊지못하는 공연</h4>
              <div className="border-border bg-bg-sub flex flex-col gap-1 rounded-lg border p-3">
                <strong className="text-text-main text-sm font-medium">
                  아콘서트가고싶다 콜드플레이 내한콘서트
                </strong>
                <span className="text-text-sub text-xs">고척돔 · 2025년 12월 25일</span>
              </div>
              <p className="text-text-sub line-clamp-3">
                진심으로 콜드플레이 내한 콘서트 가고싶은데 언제 오시는지 모르겠네요 진짜
                가고싶습니다 VIP석 결제할게 딱기다려 젭알진심으로 콜드플레이 내한 콘서트 가고싶은데
                언제 오시는지 모르겠네요 진짜 가고싶습니다 VIP석 결제할게 딱기다려 젭알 진심으로
                콜드플레이 내한 콘서트 가고싶은데 언제 오시는지 모르겠네요 진짜 가고싶습니다 VIP석
                결제할게 딱기다려 젭알 진심으로 콜드플레이 내한 콘서트 가고싶은데 언제 오시는지
                모르겠네요 진짜 가고싶습니다 VIP석 결제할게 딱기다려 젭알 진심으로 콜드플레이 내한
                콘서트 가고싶은데 언제 오시는지 모르겠네요 진짜 가고싶습니다 VIP석 결제할게 딱기다려
                젭알 진심으로 콜드플레이 내한 콘서트 가고싶은데 언제 오시는지 모르겠네요 진짜
                가고싶습니다 VIP석 결제할게 딱기다려 젭알 진심으로 콜드플레이 내한 콘서트 가고싶은데
                언제 오시는지 모르겠네요 진짜 가고싶습니다 VIP석 결제할게 딱기다려 젭알 진심으로
                콜드플레이 내한 콘서트 가고싶은데 언제 오시는지 모르겠네요 진짜 가고싶습니다 VIP석
                결제할게 딱기다려 젭알
              </p>
            </div>
            <div className="text-text-sub flex gap-4">
              <Button variant="ghost" className="h-auto p-0! hover:bg-transparent">
                <HeartIcon size={16} />
                16
              </Button>
              <Button variant="ghost" className="h-auto p-0! hover:bg-transparent">
                <MessageCircleIcon size={16} />
                16
              </Button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
