import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SeatInfoSection() {
  return (
    <CardContent className={"flex flex-col gap-2"}>
      <CardTitle>좌석 정보</CardTitle>
      <div className={"flex gap-2"}>
        <Input className={"h-13"} placeholder={"구역 (예: A구역, 스탠딩)"} />
        <Input className={"h-13"} placeholder={"열 / 좌석 번호 (예: 12열 15번)"} />
      </div>
      <CardDescription className={"text-xs"}>
        이 자리, 잘 보였나요? 후기로 알려주세요
      </CardDescription>
    </CardContent>
  );
}
