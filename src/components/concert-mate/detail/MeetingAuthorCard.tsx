import { Card, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/**
 * TODO (데이터 연동 단계):
 * - 리뷰 상세 API에서 작성자 정보를 받아 props로 전달하도록 변경
 * - 필요 데이터: name, email, profileImage
 * - 현재는 퍼블리싱 검증을 위한 하드코딩 상태
 */
export default function MeetingAuthorCard() {
  return (
    <Card className={"flex flex-col gap-4 p-6"}>
      <CardTitle>작성자 정보</CardTitle>
      <div className={"flex gap-4"}>
        {/**
         * TODO:
         * - 작성자 프로필 이미지 URL 연동
         * - 이미지가 없는 경우 기본 AvatarFallback 노출
         */}
        <Avatar className={"h-16 w-16"}>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {/**
         * TODO:
         * - 작성자 이름/이메일을 API 데이터로 교체
         * - 개인정보 정책에 따라 이메일 비노출 옵션 검토
         */}
        <div className={"flex flex-col justify-center gap-2"}>
          <span>김지수</span>
          <span className={"text-text-sub flex text-xs"}>jisoo1004@gmail.com</span>
        </div>
      </div>
    </Card>
  );
}
