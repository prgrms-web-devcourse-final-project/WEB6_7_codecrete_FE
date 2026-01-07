import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MatePostWrite } from "@/types/community/concert-mate";
import { Beer, Camera, CarFront, Gift, MessagesSquareIcon, Utensils } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

// TODO : 태그 추가 기능 구현
// TODO : 컴포넌트화 (/review/write)

const DEFAULT_TAGS = [
  { id: "DINNER", label: "저녁 식사", icon: Utensils },
  { id: "DRINK", label: "뒷풀이", icon: Beer },
  { id: "PHOTO", label: "사진 촬영", icon: Camera },
  { id: "GOODS", label: "굿즈 구매", icon: Gift },
  { id: "CHAT", label: "대화", icon: MessagesSquareIcon },
  { id: "CARPOOL", label: "카풀", icon: CarFront },
];

export default function ActivityTagSection() {
  const { control, setValue } = useFormContext<MatePostWrite>();

  const selectedTags =
    useWatch({
      control,
      name: "activityTags",
    }) || [];

  // 태그 클릭 핸들러 (넣었다 뺐다)
  const toggleTag = (tagLabel: string) => {
    if (!selectedTags.includes(tagLabel)) {
      // 없으면 추가
      if (selectedTags.length >= 5) return; // 최대 5개 제한
      setValue("activityTags", [...selectedTags, tagLabel], {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      // 있으면 제거
      const filteredTags = selectedTags.filter((tag: string) => tag !== tagLabel);
      setValue("activityTags", filteredTags, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  return (
    <CardContent className={"flex flex-col gap-4"}>
      <Label htmlFor="custom-tag">태그 선택 (선택)</Label>
      <div className={"flex flex-wrap gap-2"}>
        {DEFAULT_TAGS.map((tag) => {
          const Icon = tag.icon;
          const isSelected = selectedTags.includes(tag.label);

          return (
            <Button
              key={tag.id}
              variant={isSelected ? "default" : "outline"}
              type={"button"}
              onClick={() => toggleTag(tag.label)}
              className={"cursor-pointer rounded-full"}
            >
              <Icon /> {tag.label}
            </Button>
          );
        })}
      </div>
      <Input
        id="custom-tag"
        className={"h-13"}
        defaultValue={selectedTags}
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
