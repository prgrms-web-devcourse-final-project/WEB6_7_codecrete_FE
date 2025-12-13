import { CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ReviewTitleSection() {
  return (
    <CardContent className={"flex flex-col gap-2"}>
      <CardTitle>
        리뷰 제목 <span className={"text-text-sub"}>*</span>
      </CardTitle>
      <Input className={"h-13"} placeholder={"리뷰 제목을 입력해주세요."} />
      <p className={"text-text-sub text-xs"}>공연의 인상을 한 문장으로 표현해보세요</p>
    </CardContent>
  );
}
