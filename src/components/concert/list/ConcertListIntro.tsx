import { twMerge } from "tailwind-merge";

export default function ConcertListIntro() {
  return (
    <section className="intro bg-bg-sub py-20">
      <div className={twMerge(`mx-auto flex w-full max-w-400 flex-col gap-4`)}>
        <h2 className="text-text-main text-4xl font-bold">Play Your Life, Live Your Music</h2>
        <p className="text-text-sub text-md">
          남들 다 가는데 진짜 안 갈 거야...? 잊지 못할 이어폰 너머 라이브의 감동, 이제 눈앞에서
          생생하게 즐기세요.
        </p>
      </div>
    </section>
  );
}
