import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { Star } from "lucide-react";

export default function QuickStat() {
  return (
    <div className={"flex flex-col gap-6"}>
      <h3 className={"text-xl font-bold"}>Quick Stats</h3>
      <Item variant={"outline"} className={"p-6"}>
        <ItemContent className={"flex flex-col items-center justify-between gap-6"}>
          <div className={"flex w-full flex-row justify-between border-b pb-4"}>
            <ItemDescription>Debut Year</ItemDescription>
            <ItemTitle>2018</ItemTitle>
          </div>
          <div className={"flex w-full flex-row justify-between border-b pb-4"}>
            <ItemDescription>Total Albums</ItemDescription>
            <ItemTitle>3</ItemTitle>
          </div>
          <div className={"flex w-full flex-row justify-between"}>
            <ItemDescription>Popularity</ItemDescription>
            <ItemTitle>
              <Star size={12} /> 4.8
            </ItemTitle>
          </div>
        </ItemContent>
      </Item>
    </div>
  );
}
