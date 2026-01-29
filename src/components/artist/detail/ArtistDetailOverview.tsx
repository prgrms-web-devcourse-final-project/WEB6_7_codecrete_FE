import ArtistDetailAbout from "@/components/artist/detail/ArtistDetailAbout";
import Discography from "@/components/artist/detail/Discography";
import QuickStat from "@/components/artist/detail/QuickStat";
import HotTrack from "@/components/artist/detail/HotTrack";
import SimilarArtists from "@/components/artist/detail/SimilarArtists";
import { ArtistDetail } from "@/types/artists";
import MobileArtistActions from "@/components/artist/detail/MobileArtistActions";

export default function ArtistDetailOverview({ artist }: { artist: ArtistDetail }) {
  return (
    <section className={"px-5 py-6 lg:px-15 lg:py-16"}>
      <div className="mx-auto flex w-full max-w-400 flex-col gap-5 lg:flex-row lg:gap-8">
        {/*왼쪽 파트*/}
        <div className={"flex w-full flex-col gap-12"}>
          <ArtistDetailAbout artist={artist} />
          <Discography albums={artist.albums} />
        </div>
        {/*데스크톱: 오른쪽 고정 사이드바*/}
        <div
          className={
            "sticky top-34 hidden max-w-125 min-w-80 shrink-0 flex-col gap-12 self-start lg:flex"
          }
        >
          <QuickStat artist={artist} />
          <HotTrack tracks={artist.topTracks} />
          <SimilarArtists relatedArtists={artist.relatedArtists} />
        </div>
      </div>

      {/*모바일: 하단 시트 트리거*/}
      <MobileArtistActions artist={artist} />
    </section>
  );
}
