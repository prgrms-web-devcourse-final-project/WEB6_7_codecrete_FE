import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { CardFooter } from "@/components/ui/card";

export default function ReviewFooterActions() {
  return (
    <CardFooter className={"flex justify-end gap-3"}>
      <Button type={"reset"} variant={"outline"} className={"cursor-pointer"}>
        취소
      </Button>
      <Button type={"submit"} className={"cursor-pointer"}>
        <Send /> 리뷰 등록하기
      </Button>
    </CardFooter>
  );
}
