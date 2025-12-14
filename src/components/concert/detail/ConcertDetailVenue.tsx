import { Link, MapPin, Phone } from "lucide-react";
import { twMerge } from "tailwind-merge";

export default function ConcertDetailVenue() {
  return (
    <div className="venue flex flex-col gap-6">
      <h2 className="text-text-main text-3xl font-bold">공연장 정보</h2>
      <div className={twMerge(`bg-bg-sub flex flex-col gap-6 rounded-xl p-4`)}>
        <div className="grid grid-cols-2">
          <div className="flex flex-col gap-3">
            <h3 className="text-text-main text-lg">KSPO DOME(올림픽체조경기장)</h3>
            <div className={twMerge(`text-text-sub text-md flex flex-col gap-2`)}>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <p>서울특별시 송파구 올림픽로 424</p>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <p>02-1234-5674</p>
              </div>
              <div className="flex items-center gap-1">
                <Link className="h-4 w-4" />
                <p>https://www.ksponco.or.kr</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {/* TODO : 구현 가능성 희박, 일단 더미 데이터 */}
            <h3 className="text-text-main text-lg">가는 방법</h3>
            <div className="text-text-sub flex flex-col gap-2">
              <p>지하철 : 2호선, 4호선</p>
              <p>버스 : 66, 66-4, 10, 15</p>
              <p>주차 : 길바닥 아무데나 하쇼</p>
            </div>
          </div>
        </div>
        <div className="bg-text-point-sub rounded-2xl p-4">map자리</div>
      </div>
    </div>
  );
}
