import { Button } from "@/components/ui/button";
import { CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Beer, Camera, CarFront, Gift, MessagesSquareIcon, Utensils } from "lucide-react";

/*
 * TODO: 태그 선택 기능 구현
 *
 * - 선택된 태그를 관리할 selectedTags 상태(string[])
 * - 태그 Button 클릭 시:
 *   - 이미 선택된 태그면 제거
 *   - 선택되지 않은 태그면 추가
 * - 선택된 태그는 활성 스타일 적용
 * - 최대 태그 개수 제한 (예: 5개)
 */

export default function ActivityTagSection() {
  return (
    <CardContent className={"flex flex-col gap-4"}>
      <CardTitle>태그 선택</CardTitle>
      {/*아래 부분은 퍼블리싱 파트로 나중에 동적으로 추가되는 파트*/}
      {/*TODO: 추가된 태그 클릭시 삭제되도록 구현*/}
      <div className={"flex flex-wrap gap-2"}>
        <Button variant={"outline"} type={"button"} className={"cursor-pointer rounded-full"}>
          <Utensils /> 저녁 식사
        </Button>
        <Button variant={"outline"} type={"button"} className={"cursor-pointer rounded-full"}>
          <Beer /> 뒷풀이
        </Button>
        <Button variant={"outline"} type={"button"} className={"cursor-pointer rounded-full"}>
          <Camera /> 사진 촬영
        </Button>
        <Button variant={"outline"} type={"button"} className={"cursor-pointer rounded-full"}>
          <Gift /> 굿즈 구매
        </Button>
        <Button variant={"outline"} type={"button"} className={"cursor-pointer rounded-full"}>
          <MessagesSquareIcon /> 대화
        </Button>
        <Button variant={"outline"} type={"button"} className={"cursor-pointer rounded-full"}>
          <CarFront /> 카풀
        </Button>
      </div>
      <Input
        className={"h-13"}
        placeholder={
          "직접 태그를 추가해보세요 (Enter 입력)" /*
           * TODO: Enter 입력 시
           * - input value를 tag로 추가
           * - 공백/중복 태그 방지
           * - 추가 후 input 초기화
           */
        }
      />
    </CardContent>
  );
}
