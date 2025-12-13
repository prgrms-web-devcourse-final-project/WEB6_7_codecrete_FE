import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReviewWriteHeader() {
  return (
    <CardHeader>
      <CardTitle className={"text-2xl"}>공연의 감동을 나눠주세요</CardTitle>
      <CardDescription>
        직접 다녀온 공연의 이야기를 들려주세요. 당신의 리뷰가 누군가의 최고의 공연을 찾아줄 수
        있어요.
      </CardDescription>
    </CardHeader>
  );
}
