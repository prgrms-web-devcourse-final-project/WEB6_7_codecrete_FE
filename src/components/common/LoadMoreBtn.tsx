import Link from "next/link";
import { Button } from "@/components/ui/button";

type LoadMoreBtnProps = {
  href?: string;
};

export default function LoadMoreBtn({ href = "#" }: LoadMoreBtnProps) {
  return (
    <div className={"flex justify-center"}>
      <Link href={href}>
        <Button size={"lg"} variant={"outline"} className={"cursor-pointer border"} type={"button"}>
          <span className={"font-bold"}>더보기</span>
        </Button>
      </Link>
    </div>
  );
}
