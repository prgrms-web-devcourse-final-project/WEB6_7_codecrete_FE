import { CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { ReviewPostWrite } from "@/types/community/concert-review";

export default function ReviewTitleSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ReviewPostWrite>();

  return (
    <CardContent className={"flex flex-col gap-2"}>
      <CardTitle>
        리뷰 제목 <span className={"text-text-sub"}>*</span>
      </CardTitle>
      <Input
        className={"h-13"}
        placeholder={"리뷰 제목을 입력해주세요."}
        {...register("title", { required: "제목을 입력해주세요" })}
      />
      {errors.title && <span className="text-destructive text-xs">{errors.title.message}</span>}
      <p className={"text-text-sub text-xs"}>공연의 인상을 한 문장으로 표현해보세요</p>
    </CardContent>
  );
}
