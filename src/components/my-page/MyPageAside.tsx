import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CalendarCheck, HeartIcon } from "lucide-react";
import Link from "next/link";

export default function MyPageAside() {
  return (
    <div className="max-w-125 flex-1">
      <div className="*:border-border *: sticky top-30 flex flex-col space-y-8 *:rounded-2xl *:border *:p-6">
        <div className="space-y-4">
          <h4 className="text-base font-bold">빠른 탐색</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-4">
              <div className="bg-bg-sub flex size-12 items-center justify-center rounded-xl">
                <CalendarCheck size={20} className="text-text-main" />
              </div>
              <div className="flex-1">
                <h5 className="text-text-sub text-sm font-medium">찜한 콘서트</h5>
                <p className="text-text-main line-clamp-1 text-base font-medium">6개</p>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <div className="bg-bg-sub flex size-12 items-center justify-center rounded-xl">
                <HeartIcon size={20} className="text-text-main" />
              </div>
              <div className="flex-1">
                <h5 className="text-text-sub text-sm font-medium">찜한 아티스트</h5>
                <p className="text-text-main line-clamp-1 text-base font-medium">28명</p>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <div className="bg-bg-sub flex size-12 items-center justify-center rounded-xl">
                <CalendarCheck size={20} className="text-text-main" />
              </div>
              <div className="flex-1">
                <h5 className="text-text-sub text-sm font-medium">알림 신청</h5>
                <p className="text-text-main line-clamp-1 text-base font-medium">12개</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold">예정된 콘서트</h4>
            <Link href="/my-page/schedules" className="text-text-sub text-sm font-medium">
              모두 보기
            </Link>
          </div>
          <ul className="space-y-3">
            <li className="flex items-center gap-4">
              <div className="bg-bg-sub flex size-18 items-center justify-center rounded-xl">
                <AspectRatio ratio={1}>
                  <div className="bg-bg-sub"></div>
                </AspectRatio>
              </div>
              <div className="flex-1 space-y-1">
                <h5 className="text-text-main line-clamp-1 text-base font-medium">
                  The Weeknd - After Hours Tour
                </h5>
                <p className="text-text-sub text-sm font-medium">Mar 21, 2025</p>
                <p className="text-text-sub text-xs font-medium">Barclays Center</p>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <div className="bg-bg-sub flex size-18 items-center justify-center rounded-xl">
                <AspectRatio ratio={1}>
                  <div className="bg-bg-sub"></div>
                </AspectRatio>
              </div>
              <div className="flex-1 space-y-1">
                <h5 className="text-text-main line-clamp-1 text-base font-medium">
                  The Weekend - After Hours Tour
                </h5>
                <p className="text-text-sub text-sm font-medium">Mar 21, 2025</p>
                <p className="text-text-sub text-xs font-medium">Barclays Center</p>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <div className="bg-bg-sub flex size-18 items-center justify-center rounded-xl">
                <AspectRatio ratio={1}>
                  <div className="bg-bg-sub"></div>
                </AspectRatio>
              </div>
              <div className="flex-1 space-y-1">
                <h5 className="text-text-main line-clamp-1 text-base font-medium">
                  The Weeknd - After Hours Tour
                </h5>
                <p className="text-text-sub text-sm font-medium">Mar 21, 2025</p>
                <p className="text-text-sub text-xs font-medium">Barclays Center</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold">최근 찜</h4>
            <Link href="/my-page/likes" className="text-text-sub text-sm font-medium">
              모두 보기
            </Link>
          </div>
          <ul className="space-y-3">
            <li className="flex items-center gap-4">
              <div className="bg-bg-sub flex size-12 items-center justify-center rounded-xl">
                <AspectRatio ratio={1}>
                  <div className="bg-bg-sub"></div>
                </AspectRatio>
              </div>
              <div className="flex-1 space-y-1">
                <h5 className="text-text-main line-clamp-1 text-base font-medium">아티스트명</h5>
                <p className="text-text-sub text-xs font-medium">3일 전</p>
              </div>
              <Link href="#" className="text-text-main underline">
                View
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold">최근 글</h4>
            <Link href="/my-page/board" className="text-text-sub text-sm font-medium">
              모두 보기
            </Link>
          </div>
          <ul className="space-y-3">
            <li className="flex items-center gap-4">
              <Link href={"#"} className="space-y-1">
                <h5 className="text-text-main line-clamp-1 text-base font-medium">아티스트명</h5>
                <p className="text-text-sub text-xs font-medium">글 제목 · 3일전</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
