import MyPageAside from "@/components/my-page/overview/MyPageAside";
import MyPageCalendar from "@/components/my-page/overview/MyPageCalendar";
import { getAllLikedConcerts } from "@/lib/api/myPage/myPage.server";

export default async function Page() {
  const likedConcerts = await getAllLikedConcerts();

  if (likedConcerts.data == null) {
    likedConcerts.data = [];
  }

  // // TODO : 찜한 아티스트 싹 불러오기
  // const likedArtists = [];
  // // TODO : 내가 속한 외출플래너 싹 불러오기
  // const joinedPlanners = [];
  // // TODO : 내가 찜한 콘서트에서 예정된 콘서트 필터링
  // const upcomingLikedConcerts = [];
  // // TODO : 최근 찜한 콘서트/아티스트 구분없이 3개까지만
  // const recentLikes = [];

  return (
    <div className="px-15 py-10">
      <div className="mx-auto flex w-full max-w-400 gap-8">
        <MyPageCalendar concerts={likedConcerts.data} />
        <MyPageAside likedConcerts={likedConcerts.data} />
      </div>
    </div>
  );
}
