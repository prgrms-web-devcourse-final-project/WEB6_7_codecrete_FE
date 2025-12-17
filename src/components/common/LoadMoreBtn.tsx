import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LoadMoreBtn() {
  // TODO : href props로 받기
  return (
    <div className={"flex justify-center"}>
      <Link href={"#"}>
        <Button size={"lg"} variant={"outline"} className={"cursor-pointer border"} type={"button"}>
          <span className={"font-bold"}>더보기</span>
        </Button>
      </Link>
    </div>
  );
}
