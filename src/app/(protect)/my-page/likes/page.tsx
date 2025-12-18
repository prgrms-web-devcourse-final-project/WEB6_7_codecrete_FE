import MyPageLikedArtistList from "@/components/my-page/MyPageLikedArtistList";
import MyPageLikedConcertList from "@/components/my-page/MyPageLikedConcertList";

export default function Page() {
  return (
    <div className="mt-15 space-y-20 px-15">
      <section>
        <MyPageLikedArtistList />
      </section>
      <section>
        <MyPageLikedConcertList />
      </section>
    </div>
  );
}
