"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ArtistListButtons() {
  return (
    <div className={"text-text-sub flex items-center gap-3"}>
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
      <Select>
        <SelectTrigger type={"button"} className={"rounded-full text-sm font-bold"}>
          <SelectValue placeholder="더 보기" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>장르</SelectLabel>
            <SelectItem value="jpop">JPOP</SelectItem>
            <SelectItem value="pop">POP</SelectItem>
            <SelectItem value="shoegaze">SHOEGAZE</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
