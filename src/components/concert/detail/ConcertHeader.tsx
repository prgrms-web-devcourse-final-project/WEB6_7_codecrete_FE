import Image from "next/image";
import ConcertHeaderArtist from "@/components/concert/detail/ConcertHeaderArtist";
import ConcertHeaderBtn from "@/components/concert/detail/ConcertHeaderBtn";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { twMerge } from "tailwind-merge";
import { Badge } from "@/components/ui/badge";
import ConcertHeaderInfo from "./ConcertHeaderInfo";
import { formatDateRange, formatPrice } from "@/utils/helpers/formatters";
import ConcertLikeButton from "./ConcertLikeButton";
import {
  getConcertDetail,
  getTicketOfficesByConcertId,
  getIsLikedConcert,
} from "@/lib/api/concerts";
import { getAuthStatus, getMe } from "@/lib/auth/auth.server";
import { cookies } from "next/headers";

export default async function ConcertHeader({ concertId }: { concertId: string }) {
  const cookieStore = await cookies();

  const [concertDetail, concertTicketing, isAuthenticated] = await Promise.all([
    getConcertDetail({ concertId }),
    getTicketOfficesByConcertId({ concertId }),
    getAuthStatus(),
  ]);

  let userData = null;
  let isLikedConcert = null;

  if (isAuthenticated) {
    [userData, isLikedConcert] = await Promise.all([
      getMe().then((res) => res.data),
      getIsLikedConcert(concertId, cookieStore.toString()),
    ]);
  }

  if (!concertDetail) {
    return null;
  }

  return (
    <section className="header bg-bg-sub px-15 py-10">
      <div className="mx-auto flex w-full max-w-400 items-start gap-8">
        <div className="border-border w-2/5 overflow-hidden rounded-2xl border">
          <AspectRatio ratio={320 / 426.5}>
            <Image
              src={
                concertDetail.posterUrl ??
                // TODO : 임시 포스터 이미지 생성해서 넣기
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
              }
              alt={concertDetail.name}
              className="object-cover"
              fill
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            />
          </AspectRatio>
        </div>
        <div className="bg-bg-main border-border flex flex-1 flex-col gap-8 rounded-2xl border p-10">
          <div className="title flex justify-between">
            <div className="flex flex-col gap-4">
              {/* TODO : 아티스트 쪽 장르? 된다면 넣기 */}
              <Badge className={twMerge(`bg-point-main text-text-point-main mr-2 text-sm`)}>
                Rock
              </Badge>
              <div className="flex flex-col gap-1">
                <h2 className="text-text-main text-4xl font-bold">{concertDetail.name}</h2>
                <p className="text-text-sub text-xl">{concertDetail.description}</p>
              </div>
            </div>
            <ConcertLikeButton
              concertId={concertDetail.concertId}
              isLiked={isLikedConcert?.isLike}
            />
          </div>
          <div className="border-border grid grid-cols-2 gap-x-4 gap-y-6 border-y py-8">
            <ConcertHeaderInfo
              type="date"
              label="날짜 및 시간"
              title={formatDateRange(concertDetail.startDate, concertDetail.endDate)}
            />
            <ConcertHeaderInfo type="location" label="장소" title={concertDetail.placeName} />
            <ConcertHeaderInfo
              type="price"
              label="티켓 가격"
              title={formatPrice(concertDetail.minPrice, concertDetail.maxPrice)}
            />
            {/* TODO : 관리자일 경우 예매일정 직접 입력하는 버튼 추가 */}
            <ConcertHeaderInfo
              type="ticketing"
              label="예매 일정"
              title={
                concertDetail?.ticketTime && concertDetail.ticketEndTime
                  ? formatDateRange(concertDetail?.ticketTime, concertDetail?.ticketEndTime)
                  : "정보없음"
              }
            />
          </div>
          <ConcertHeaderArtist />
          <ConcertHeaderBtn
            concertDetail={concertDetail}
            concertTicketingData={concertTicketing}
            userData={userData}
          />
        </div>
      </div>
    </section>
  );
}
