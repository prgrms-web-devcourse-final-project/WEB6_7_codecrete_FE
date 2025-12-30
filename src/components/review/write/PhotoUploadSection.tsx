"use client";

import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { FileUploadBox } from "@/components/review/write/FileUploadBox";

/*
 * TODO: 좌석 정보 입력 기능 구현
 *
 * - 좌석 정보는 선택 입력(Optional)
 *   - 구역(section)
 *   - 열/좌석 번호(seat)
 *
 * - 상태는 부모 컴포넌트에서 관리
 *
 * Props 예시:
 * type SeatInfoSectionProps = {
 *   section: string;
 *   seat: string;
 *   onChangeSection: (value: string) => void;
 *   onChangeSeat: (value: string) => void;
 * };
 *
 * - submit 시 좌석 정보가 입력된 경우에만 서버로 전달
 */

export default function PhotoUploadSection() {
  const handleImgChange = () => {};
  return (
    <CardContent className={"flex flex-col gap-2"}>
      <CardTitle>사진 업로드</CardTitle>
      <FileUploadBox onFileChange={handleImgChange} />
      <CardDescription className={"text-xs"}>
        무대, 시야, 현장 분위기가 담긴 사진을 공유해보세요
      </CardDescription>
    </CardContent>
  );
}
