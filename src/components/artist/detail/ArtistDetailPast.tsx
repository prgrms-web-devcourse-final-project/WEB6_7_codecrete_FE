import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Funnel } from "lucide-react";
import DropdownButton from "@/components/artist/detail/DropdownButton";
import Link from "next/link";
import ArtistConcertItem from "@/components/artist/detail/ArtistConcertItem";

// TODO: 나중에 api로 불러와서 데이터가 없는경우 로직도 추가 구현해야 함

export default function ArtistDetailPast() {
  return (
    <section className={"bg-bg-main px-15 py-16"}>
      <div className={"mx-auto flex max-w-400 flex-col gap-8"}>
        {/*헤더 및 분류 버튼 파트*/}
        <div className={"flex justify-between"}>
          <h2 className={"text-3xl font-bold"}>지난 공연</h2>
          <div className={"flex gap-3"}>
            <DropdownButton
              button={
                <Button variant={"outline"} className={"flex gap-2"}>
                  <Funnel size={12} fill={"true"} />
                  <span>필터</span>
                </Button>
              }
            />
            <DropdownButton
              button={
                <Button variant={"outline"} className={"flex gap-2"}>
                  <ChevronsUpDown size={12} fill={"true"} />
                  <span>날짜순 정렬</span>
                </Button>
              }
            />
          </div>
        </div>
        {/*TODO: 나중에 바로 아래 div에서 api로 불러온 콘서트 목록 map으로 돌리기*/}
        {/*콘서트 아이템 파트*/}
        <div>
          <ArtistConcertItem />
        </div>
        <div className={"flex justify-center"}>
          {/*콘서트 로더 버튼 파트*/}
          <Link href={"#"}>
            <Button
              size={"lg"}
              variant={"outline"}
              className={"border-border cursor-pointer border-2"}
              type={"button"}
            >
              <span className={"font-bold"}>지난 공연 더 보기</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
