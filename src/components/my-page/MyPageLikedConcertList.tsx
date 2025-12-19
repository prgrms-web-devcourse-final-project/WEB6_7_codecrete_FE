import { SortSelect } from "../common/SortSelect";
import ConcertCard from "../concert/ConcertCard";

export default function MyPageLikedConcertList() {
  return (
    <div className="mx-auto max-w-400 space-y-8">
      <div className="flex justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-bold">찜한 공연</h3>
          <p className="text-text-sub text-sm">총 24개</p>
        </div>
        <SortSelect />
      </div>
      <div className="list grid gap-8 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <ConcertCard
            key={index}
            id={index}
            posterUrl="/ConcertPoster.png"
            name="The Midnight Echo Live"
            startDate="March 15, 2025 • 8:00 PM"
            endDate="March 15, 2025 • 8:00 PM"
            placeName="Madison Square Garden"
          />
        ))}
      </div>
    </div>
  );
}
