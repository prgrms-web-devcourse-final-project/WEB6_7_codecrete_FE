import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SortSelect() {
  return (
    <Select>
      <SelectTrigger size="default" className="bg-point-sub w-22">
        <SelectValue placeholder="정렬" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>정렬</SelectLabel>
          <SelectItem value="popular">인기순</SelectItem>
          <SelectItem value="name">이름순</SelectItem>
          <SelectItem value="date">날짜순</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
