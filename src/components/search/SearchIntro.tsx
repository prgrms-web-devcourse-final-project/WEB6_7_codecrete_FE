import { twMerge } from "tailwind-merge";
import SearchInput from "@/components/concert-mate/SearchInput";

export default function SearchIntro() {
  return (
    <section className="bg-bg-sub px-15 py-16">
      <div className={twMerge(`mx-auto flex w-full max-w-400 flex-col gap-8`)}>
        <div className="flex flex-col gap-6">
          <h2 className="text-text-main text-4xl font-bold">검색 결과</h2>
          <SearchInput className="w-[60%]" />
          <div className="flex gap-1">
            <p>&quot;검색어&quot;에 대한 </p>
            <strong>47개의 결과</strong>
            <p>를 찾았습니다.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
