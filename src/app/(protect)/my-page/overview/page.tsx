import MyPageAside from "@/components/my-page/overview/MyPageAside";
import MyPageCalendar from "@/components/my-page/overview/MyPageCalendar";
import { getAllLikedConcerts, getLikedArtistList } from "@/lib/api/myPage/myPage.server";
import { getPlanList } from "@/lib/api/planner/planner.server";

export default async function Page() {
  const likedConcerts = await getAllLikedConcerts();

  if (likedConcerts.data == null) {
    likedConcerts.data = [];
  }

  const joinedPlanners = await getPlanList();
  const likedArtists = await getLikedArtistList();

  if (likedArtists.data == null) {
    likedArtists.data = [];
  }

  return (
    <div className="px-15 py-10">
      <div className="mx-auto flex w-full max-w-400 gap-8">
        <MyPageCalendar concerts={likedConcerts.data} planners={joinedPlanners} />
        <MyPageAside
          likedConcerts={likedConcerts.data}
          likedArtists={likedArtists.data}
          joinedPlanners={joinedPlanners}
        />
      </div>
    </div>
  );
}
