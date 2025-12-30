"use client";

import { useSearchParams } from "next/navigation";

export default function SearchIntro() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  return (
    <section className="bg-bg-sub px-15 py-16">
      <div className="mx-auto flex w-full max-w-400 flex-col gap-4">
        <h2 className="text-text-main text-4xl font-bold">검색 결과</h2>
        <p className="text-text-sub text-base">
          <span className="text-point-main">&quot;{keyword}&quot;</span>에 대한
          <span className="text-point-main ml-1">47개</span>의 결과를 찾았습니다.
        </p>
      </div>
    </section>
  );
}
