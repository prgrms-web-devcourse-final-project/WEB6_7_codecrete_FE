import { CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DEFAULT_TAGS } from "@/components/review/write/REVIEW_DEFAULT_TAGS";
import { useFormContext, useWatch } from "react-hook-form";
import { ReviewPostWrite } from "@/types/community/concert-review";
import { toast } from "sonner";

export default function ReviewTagSection() {
  const { control, setValue } = useFormContext<ReviewPostWrite>();

  const selectedTags = useWatch({
    control,
    name: "activityTags",
  });

  // 태그 클릭 핸들러 (넣었다 뺐다)
  const toggleTag = (tagLabel: string) => {
    if (!selectedTags?.includes(tagLabel)) {
      // 없으면 추가
      if (selectedTags.length >= 5) {
        toast.error("태그 선택은 최대 5개 까지입니다.");
        return;
      } // 최대 5개 제한
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
      <CardTitle>태그 (선택)</CardTitle>
      {/*아래 부분은 퍼블리싱 파트로 나중에 동적으로 추가되는 파트*/}
      {/*TODO: 추가된 태그 클릭시 삭제되도록 구현*/}
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
              className={"cursor-pointer rounded-full border!"}
            >
              <Icon /> {tag.label}
            </Button>
          );
        })}
      </div>
      <p className="text-text-sub text-xs">태그는 최대 5개까지 선택 가능합니다.</p>
    </CardContent>
  );
}
