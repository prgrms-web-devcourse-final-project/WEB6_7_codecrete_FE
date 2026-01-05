export default function SearchIntro({ keyword, counts }: { keyword: string; counts: number }) {
  return (
    <section className="bg-bg-sub px-15 py-16">
      <div className="mx-auto flex w-full max-w-400 flex-col gap-4">
        <h2 className="text-text-main text-4xl font-bold">검색 결과</h2>
        <p className="text-text-sub text-base">
          <span className="text-point-main">&quot;{keyword}&quot;</span>에 대한
          <span className="text-point-main ml-1">{counts}개</span>의 결과를 찾았습니다.
        </p>
      </div>
    </section>
  );
}
