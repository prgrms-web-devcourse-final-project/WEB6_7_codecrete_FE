import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";

export default function HotTrack() {
  return (
    <div className={"flex flex-col gap-6"}>
      {/*TODO: api로 트랙 불러오면 map으로 돌리기*/}
      <h3 className={"text-xl font-bold"}>Hot Track</h3>
      <Item variant={"outline"} className={"p-6"}>
        <ItemContent className={"flex flex-col items-center justify-between gap-3"}>
          <div className={"flex w-full flex-row gap-4"}>
            <ItemDescription>01</ItemDescription>
            <ItemTitle>HOT</ItemTitle>
          </div>
          <div className={"flex w-full flex-row gap-4"}>
            <ItemDescription>02</ItemDescription>
            <ItemTitle>HIT</ItemTitle>
          </div>
          <div className={"flex w-full flex-row gap-4"}>
            <ItemDescription>03</ItemDescription>
            <ItemTitle>CLAP</ItemTitle>
          </div>
          <div className={"flex w-full flex-row gap-4"}>
            <ItemDescription>04</ItemDescription>
            <ItemTitle>Mansae</ItemTitle>
          </div>
          <div className={"flex w-full flex-row gap-4"}>
            <ItemDescription>05</ItemDescription>
            <ItemTitle>Pretty U</ItemTitle>
          </div>
        </ItemContent>
      </Item>
    </div>
  );
}
