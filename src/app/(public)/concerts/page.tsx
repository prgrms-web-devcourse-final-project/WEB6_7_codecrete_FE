import BreadcrumbNav from "@/components/common/BreadcrumbNav";
import { SortSelect } from "@/components/common/SortSelect";
import ConcertCard from "@/components/concert/ConcertCard";

export default function Page() {
  return (
    <>
      <BreadcrumbNav itemType="공연" />
      <main className="flex flex-col gap-9">
        <section className="intro bg-bg-sub flex flex-col gap-4 px-40 py-20">
          <h2 className="text-text-main text-4xl font-bold">Play Your Life, Live Your Music</h2>
          <p className="text-text-sub text-md">
            남들 다 가는데 진짜 안 갈 거야...? 잊지 못할 이어폰 너머 라이브의 감동, 이제 눈앞에서
            생생하게 즐기세요.
          </p>
        </section>

        <section className="flex flex-col gap-9 px-40">
          {/* TODO : 위 아래로 gap 너무 큼 */}
          <div className="sortBar flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-text-main text-2xl font-bold">1,352</span>
              <span className="text-text-main text-lg">items</span>
            </div>
            <SortSelect />
          </div>

          <div className="list grid gap-8 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <ConcertCard
              image="/ConcertPoster.png"
              title="The Midnight Echo Live"
              date="March 15, 2025 • 8:00 PM"
              location="Madison Square Garden"
            />
            {/* TODO : 정렬 확인을 위한 임시 더미  */}
            <ConcertCard
              image="/ㅊ.png"
              title="The Midnight Echo Live"
              date="March 15, 2025 • 8:00 PM"
              location="Madison Square Garden"
            />
            <ConcertCard
              image="/ConcertPoster.png"
              title="The Midnight Echo Live"
              date="March 15, 2025 • 8:00 PM"
              location="Madison Square Garden"
            />
            <ConcertCard
              image="/ConcertPoster.png"
              title="The Midnight Echo Live"
              date="March 15, 2025 • 8:00 PM"
              location="Madison Square Garden"
            />
            <ConcertCard
              image="/ConcertPoster.png"
              title="The Midnight Echo Live"
              date="March 15, 2025 • 8:00 PM"
              location="Madison Square Garden"
            />
            <ConcertCard
              image="/ConcertPoster.png"
              title="The Midnight Echo Live"
              date="March 15, 2025 • 8:00 PM"
              location="Madison Square Garden"
            />
            <ConcertCard
              image="/ConcertPoster.png"
              title="The Midnight Echo Live"
              date="March 15, 2025 • 8:00 PM"
              location="Madison Square Garden"
            />
            <ConcertCard
              image="/ConcertPoster.png"
              title="The Midnight Echo Live"
              date="March 15, 2025 • 8:00 PM"
              location="Madison Square Garden"
            />
            <ConcertCard
              image="/ConcertPoster.png"
              title="The Midnight Echo Live"
              date="March 15, 2025 • 8:00 PM"
              location="Madison Square Garden"
            />
            <ConcertCard
              image="/ConcertPoster.png"
              title="The Midnight Echo Live"
              date="March 15, 2025 • 8:00 PM"
              location="Madison Square Garden"
            />
          </div>
        </section>
      </main>
    </>
  );
}
