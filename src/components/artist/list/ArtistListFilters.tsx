import { Button } from "@/components/ui/button";
import { ChevronsUpDown, SlidersHorizontal } from "lucide-react";
import DropdownButton from "@/components/artist/detail/DropdownButton";

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
          Festival
        </Button>
        {/*TODO: 아래 dropdown들 모두 select로 바꾸기*/}
        <DropdownButton
          button={
            <Button variant={"outline"} className={"flex gap-2 rounded-full"} size={"lg"}>
              <SlidersHorizontal size={12} fill={"true"} />
              <span>More Filters</span>
            </Button>
          }
        />
      </div>
      <DropdownButton
        button={
          <Button variant={"outline"} className={"flex gap-2"} size={"lg"}>
            <ChevronsUpDown size={12} fill={"true"} />
            <span>정렬</span>
          </Button>
        }
      />
    </div>
  );
}
