import { Card, CardContent, CardTitle } from "@/components/ui/card";
import InfoRow from "@/components/review/post/info/InfoRow";
import MeetingPosterBox from "@/components/concert-mate/detail/MeetingPosterBox";

export default function MeetingConcertCard() {
  /**
   * TODO:
   * - 공연 상세 데이터 API 연동 시 props로 공연 정보를 전달하도록 변경
   *   (ex. title, date, venue, time, section)
   *
   * - 현재는 퍼블리싱을 위한 하드코딩 데이터 상태
   * - 추후 ReviewPostMain 또는 server component에서 데이터 패칭 후 내려줄 예정
   */

  return (
    <Card className={"p-6"}>
      <div className={"flex gap-6"}>
        {/**
         * TODO:
         * - PosterBox에 실제 공연 포스터 이미지 URL 전달
         * - 이미지 로딩 실패 시 fallback 이미지 처리 필요
         */}
        <MeetingPosterBox />

        <CardContent className={"flex flex-1 flex-col gap-2"}>
          {/**
           * TODO:
           * - 리뷰 카테고리 값도 API 응답에 따라 동적으로 변경
           *   (ex. 콘서트 리뷰 / 페스티벌 리뷰 등)
           */}
          <p className={"text-text-sub"}>콘서트 리뷰</p>

          {/**
           * TODO:
           * - 공연 제목(title) API 데이터로 교체
           * - 길어질 경우 line-clamp 처리 여부 논의 필요
           */}
          <CardTitle className={"text-xl"}>IU 2025 World Tour: The Golden Hour in Seoul</CardTitle>

          <div className={"flex flex-col gap-4"}>
            <div className={"flex justify-between gap-4"}>
              {/**
               * TODO:
               * - 날짜 / 장소 데이터 API 연동
               * - 날짜 포맷 유틸 함수 적용 고려 (YYYY.MM.DD 등)
               */}
              <InfoRow label={"공연 날짜"} value={"2025년 3월 15일"} />
              <InfoRow label={"공연 장소"} value={"올림픽 체조경기장"} />
            </div>

            <div className={"flex justify-between gap-4"}>
              {/**
               * TODO:
               * - 시간 / 좌석 정보 API 연동
               * - 좌석 정보 없는 경우 UI 처리 (미노출 or placeholder)
               */}
              <InfoRow label={"공연 시간"} value={"오후 7:00"} />
              <InfoRow label={"좌석 구역"} value={"스탠딩 A"} />
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
