import { CardContent, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ConcertSelectSection() {
  return (
    <CardContent className={"flex flex-col gap-2"}>
      <CardTitle>
        공연 선택 <span className={"text-text-sub"}>*</span>
      </CardTitle>
      <Select>
        <SelectTrigger className={"h-13! w-full px-4 py-3"}>
          <SelectValue placeholder={"어떤 공연을 보고 오셨나요?"} />{" "}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>공연명</SelectLabel>
            {/*TODO: 나중에 value 부분을 해당 공연의 id로 바꾸기*/}
            <SelectItem value="apple">YE LIVE IN KOREA</SelectItem>
            <SelectItem value="banana">CIRCUS MAXIMUS in Korea</SelectItem>
            <SelectItem value="blueberry">ZUTOMAYO INTENSE II 「坐・ZOMBIE CRAB LABO」</SelectItem>
            <SelectItem value="grapes">IU HEREH World Tour</SelectItem>
            <SelectItem value="pineapple">ONE OK ROCK DETOX Asia Tour 2026 in Korea</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </CardContent>
  );
}
