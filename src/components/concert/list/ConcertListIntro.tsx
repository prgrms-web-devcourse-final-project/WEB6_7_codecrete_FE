import { twMerge } from "tailwind-merge";

export default function ConcertListIntro() {
  return (
    <section className="intro bg-bg-sub border-border border-b px-15 py-16">
      <div className={twMerge(`mx-auto flex w-full max-w-400 flex-col gap-4`)}>
        <h2 className="text-text-main text-4xl font-bold">공연 둘러보기</h2>
        <p className="text-text-sub text-md">
          &quot;Play Your Life, Live Your Music&quot; 가고 싶은 공연을 찾아보세요
        </p>
      </div>
    </section>
  );
}
