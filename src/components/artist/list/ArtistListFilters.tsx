import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import DropdownButton from "@/components/artist/detail/DropdownButton";
import { SortSelect } from "@/components/common/SortSelect";

export default function ArtistListFilters() {
  return (
    <div className={"flex justify-between"}>
      <div className={"text-text-sub flex gap-3"}>
        <Button type={"button"} className={"rounded-full"}>
          All
        </Button>
        <Button variant={"outline"} type={"button"} className={"rounded-full"}>
          K-POP
        </Button>
        <Button variant={"outline"} type={"button"} className={"rounded-full"}>
          Musical
        </Button>
        <Button variant={"outline"} type={"button"} className={"rounded-full"}>
          Rock Band
        </Button>
        <Button variant={"outline"} type={"button"} className={"rounded-full"}>
          EDM
        </Button>
        {/*TODO: 아래 dropdown들 모두 select로 바꾸기*/}
        <DropdownButton
          button={
            <Button variant={"outline"} className={"flex gap-2 rounded-full px-6! py-3!"}>
              <SlidersHorizontal size={12} fill={"true"} />
              <span>더 보기</span>
            </Button>
          }
        />
      </div>
      <SortSelect />
    </div>
  );
}
