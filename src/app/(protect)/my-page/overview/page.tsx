import MyPageAside from "@/components/my-page/overview/MyPageAside";
import MyPageCalendar from "@/components/my-page/overview/MyPageCalendar";
import {
  getAllLikedConcerts,
  getLikedArtistList,
  getLikedArtistsConcerts,
  getLikedConcertCount,
} from "@/lib/api/myPage/myPage.server";
import { getPlanList } from "@/lib/api/planner/planner.server";
import { ConcertWithTicket } from "@/types/my-page";

export default async function Page() {
  // 찜한 공연 목록 API
  const likedConcerts = await getAllLikedConcerts();
  const likedConcertsCount = await getLikedConcertCount();

  // 찜한 공연이 없을 경우 빈 배열로 초기화
  if (likedConcerts.data == null) {
    likedConcerts.data = [];
  }
  if (likedConcertsCount.data == null) {
    likedConcertsCount.data = 0;
  }

  // 참여한 플래너 목록 API
  const joinedPlanners = await getPlanList();
  const likedArtists = await getLikedArtistList();

  // 찜한 아티스트가 없을 경우 빈 배열로 초기화
  if (likedArtists.data == null) {
    likedArtists.data = [];
  }

  // 좋아요한 아티스트의 공연들 API
  const likedConcertsFromArtists = await getLikedArtistsConcerts();

  // 좋아요한 아티스트의 공연들 중복 제거 후 찜한 공연 목록에 추가
  const concertsList: ConcertWithTicket[] = likedConcerts.data;
  if (likedConcertsFromArtists.data != null) {
    // 찜한 아티스트의 공연일 경우 속성 생성해서 추가 (찜한 공연 목록과 구별)
    const existingConcertIds = new Set(concertsList.map((concert) => concert.id));
    likedConcertsFromArtists.data.forEach((artistWithConcerts) => {
      artistWithConcerts.concerts.forEach((concert) => {
        if (!existingConcertIds.has(concert.id)) {
          concertsList.push({ ...concert, isLikedArtistConcert: true });
          existingConcertIds.add(concert.id);
        }
      });
    });
  }

  return (
    <div className="px-15 py-10">
      <div className="mx-auto flex w-full max-w-400 gap-8">
        <MyPageCalendar concerts={concertsList} planners={joinedPlanners} />
        <MyPageAside
          likedConcerts={concertsList}
          likedConcertsCount={likedConcertsCount.data}
          likedArtists={likedArtists.data}
          joinedPlanners={joinedPlanners}
        />
      </div>
    </div>
  );
}
