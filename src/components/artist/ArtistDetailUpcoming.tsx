import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Funnel } from "lucide-react";
import DropdownButton from "@/components/artist/DropdownButton";
import Link from "next/link";
import ArtistConcertItem from "@/components/artist/ArtistConcertItem";

// TODO: 나중에 api로 불러와서 데이터가 없는경우 로직도 추가 구현해야 함

export default function ArtistDetailUpcoming() {
  return (
    <section className={"bg-bg-sub flex flex-col gap-8 px-13 py-16"}>
      {/*헤더 및 분류 버튼 파트*/}
      <div className={"flex justify-between"}>
        <h2 className={"text-3xl font-bold"}>Upcoming Concerts</h2>
        <div className={"flex gap-3"}>
          <DropdownButton
            button={
              <Button variant={"outline"} className={"flex gap-2"} size={"lg"}>
                <Funnel size={12} fill={"true"} />
                <span>Filter</span>
              </Button>
            }
          />
          <DropdownButton
            button={
              <Button variant={"outline"} className={"flex gap-2"} size={"lg"}>
                <ChevronsUpDown size={12} fill={"true"} />
                <span>Sort by Date</span>
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
      {/*콘서트 로더 버튼 파트*/}
      <div className={"flex justify-center"}>
        <Link href={"#"}>
          <Button
            size={"lg"}
            variant={"outline"}
            className={"cursor-pointer border-2"}
            type={"button"}
          >
            <span className={"font-bold"}>Load More Concerts</span>
          </Button>
        </Link>
      </div>
    </section>
  );
}
