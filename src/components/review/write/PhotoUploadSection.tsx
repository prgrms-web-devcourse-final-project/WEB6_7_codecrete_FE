import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { FileUploadBox } from "@/components/review/write/FileUploadBox";

export default function PhotoUploadSection() {
  return (
    <CardContent className={"flex flex-col gap-2"}>
      <CardTitle>사진 업로드</CardTitle>
      <FileUploadBox />
      <CardDescription className={"text-xs"}>
        무대, 시야, 현장 분위기가 담긴 사진을 공유해보세요
      </CardDescription>
    </CardContent>
  );
}
