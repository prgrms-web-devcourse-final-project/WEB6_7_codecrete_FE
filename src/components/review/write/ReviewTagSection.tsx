import { CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, Heart, Music, Spotlight, Star, Users } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ReviewTagSection() {
  return (
    <CardContent className={"flex flex-col gap-4"}>
      <CardTitle>태그 선택</CardTitle>
      <div className={"flex flex-wrap gap-2"}>
        <Button variant={"outline"} type={"button"} className={"cursor-pointer rounded-full"}>
          <Music /> 가창력 미쳤다
        </Button>
        <Button variant={"outline"} type={"button"} className={"cursor-pointer rounded-full"}>
          <Flame /> 에너지 폭발
        </Button>
        <Button variant={"outline"} type={"button"} className={"cursor-pointer rounded-full"}>
          <Heart /> 감동적인 공연
        </Button>
        <Button variant={"outline"} type={"button"} className={"cursor-pointer rounded-full"}>
          <Users /> 관객 호응 최고
        </Button>
        <Button variant={"outline"} type={"button"} className={"cursor-pointer rounded-full"}>
          <Star /> 기억에 남는 무대
        </Button>
        <Button variant={"outline"} type={"button"} className={"cursor-pointer rounded-full"}>
          <Spotlight /> 무대 연출 최고
        </Button>
      </div>
      <Input className={"h-13"} placeholder={"직접 태그를 추가해보세요 (Enter 입력)"} />
    </CardContent>
  );
}
