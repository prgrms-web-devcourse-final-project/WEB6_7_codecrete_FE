"use client";

import { SortSelect } from "@/components/common/SortSelect";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ListSortClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sortList = [
    { value: "LIKE", name: "인기순" },
    { value: "REGISTERED", name: "최신순" },
    { value: "UPCOMING", name: "공연 임박순" },
  ];

  const handlerSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);

    router.push(`${pathname}?${params.toString()}`);
  };

  return <SortSelect onValueChange={handlerSort} sortList={sortList} />;
}
