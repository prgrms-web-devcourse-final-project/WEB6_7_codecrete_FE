"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortSelectProps } from "@/components/concert/ConcertType";

export function SortSelect({
  onValueChange,
  sortList = [
    { value: "popular", name: "인기순" },
    { value: "new", name: "최신순" },
    { value: "name", name: "이름순" },
  ],
}: SortSelectProps) {
  /**
   * 사용 참고
   * onValueChange: 값이 변화될 때 실행될 함수 전달
   * sortList: SelectItem에 담을 value와 name(정렬이름)을 객체 배열로 전달
   * 참조 : @/components/concert/list/ListSortClient
   */
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger size="default" className="w-28">
        <SelectValue placeholder="정렬" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>정렬</SelectLabel>
          {sortList.map((sort) => (
            <SelectItem key={sort.value} value={sort.value}>
              {sort.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
