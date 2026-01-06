import MyPageLikedArtistList from "@/components/my-page/likes/MyPageLikedArtistList";
import MyPageLikedConcertList from "@/components/my-page/likes/MyPageLikedConcertList";
import { Separator } from "@/components/ui/separator";

import {
  getLikedArtistList,
  getLikedConcertCount,
  getLikedConcertList,
} from "@/lib/api/myPage/myPage.server";

export default async function Page() {
  // 찜한 아티스트 목록 API
  const likedArtists = await getLikedArtistList();
  // TODO : 찜한 아티스트 총 개수 필요함

  // 찜한 공연 목록 API
  const likedConcerts = await getLikedConcertList({ page: 0, size: 12 });
  const likedConcertsCount = await getLikedConcertCount();

  return (
    <div className="my-15 space-y-20 px-5 lg:px-15">
      <div className="mx-auto max-w-400 space-y-20">
        <section className="space-y-8">
          <MyPageLikedArtistList initialList={likedArtists.data} />
        </section>
        <Separator />
        {likedConcerts.data && (
          <section className="space-y-8">
            <MyPageLikedConcertList
              initialList={likedConcerts.data}
              totalCount={likedConcertsCount.data || 0}
            />
          </section>
        )}
      </div>
    </div>
  );
}
