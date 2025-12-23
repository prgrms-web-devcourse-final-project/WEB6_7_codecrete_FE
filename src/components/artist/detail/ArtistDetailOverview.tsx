import ArtistDetailAbout from "@/components/artist/detail/ArtistDetailAbout";
import Discography from "@/components/artist/detail/Discography";
import QuickStat from "@/components/artist/detail/QuickStat";
import HotTrack from "@/components/artist/detail/HotTrack";
import SimilarArtists from "@/components/artist/detail/SimilarArtists";
import { ArtistDetail } from "@/types/artists";

export default function ArtistDetailOverview({ artist }: { artist: ArtistDetail }) {
  return (
    <section className={"px-15 py-16"}>
      <div className="mx-auto flex w-full max-w-400 gap-12">
        {/*왼쪽 파트*/}
        <div className={"flex w-full flex-col gap-12"}>
          <ArtistDetailAbout artist={artist} />
          <Discography albums={artist?.albums ?? []} />
        </div>
        {/*오른쪽 파트*/}
        <div className={"sticky top-34 flex w-125 shrink-0 flex-col gap-12 self-start"}>
          <QuickStat artist={artist} />
          <HotTrack tracks={artist.topTracks} />
          <SimilarArtists relatedArtists={artist.relatedArtists} />
        </div>
      </div>
    </section>
  );
}
