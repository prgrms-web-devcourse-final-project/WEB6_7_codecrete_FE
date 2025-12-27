import MyPageLikedArtistList from "@/components/my-page/MyPageLikedArtistList";
import MyPageLikedConcertList from "@/components/my-page/MyPageLikedConcertList";
import { getLikedArtistList, getLikedConcertCount, getLikedConcertList } from "@/lib/api/myPage";

export default async function Page() {
  // 찜한 아티스트 목록 API
  const likedArtists = await getLikedArtistList();
  // TODO : 찜한 아티스트 총 개수 필요함

  // 찜한 공연 목록 API
  const likedConcerts = await getLikedConcertList({ page: 0, size: 12 });
  const likedConcertsCount = await getLikedConcertCount();

  return (
    <div className="my-15 space-y-20 px-15">
      <section>
        <MyPageLikedArtistList initialList={likedArtists.data} />
      </section>
      {likedConcerts.data && (
        <section>
          <MyPageLikedConcertList
            initialList={likedConcerts.data}
            totalCount={likedConcertsCount.data || 0}
          />
        </section>
      )}
    </div>
  );
}
