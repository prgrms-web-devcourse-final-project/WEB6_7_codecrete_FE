import { Item, ItemDescription, ItemTitle } from "@/components/ui/item";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function SimilarArtists() {
  return (
    <>
      <div className={"flex flex-col gap-6"}>
        <h3 className={"text-xl font-bold"}>Similar Artists</h3>
        <Item variant={"outline"} asChild>
          <Link href={"#"}>
            <div className={"bg-text-point-sub h-16 w-16 rounded-full"} />
            <div className={"flex flex-1 flex-col gap-1"}>
              <ItemTitle>Lee Ji-hoon</ItemTitle>
              <ItemDescription>Solo Artist</ItemDescription>
            </div>
            <div>
              <ChevronRight className={"text-text-sub opacity-60"} />
            </div>
          </Link>
        </Item>
      </div>
    </>
  );
}
