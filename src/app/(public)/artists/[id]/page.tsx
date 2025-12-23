import ArtistDetailProfile from "@/components/artist/detail/ArtistDetailProfile";
import ArtistDetailOverview from "@/components/artist/detail/ArtistDetailOverview";
import ArtistDetailUpcoming from "@/components/artist/detail/ArtistDetailUpcoming";
import ArtistDetailPast from "@/components/artist/detail/ArtistDetailPast";
import BreadcrumbNavbar from "@/components/review/BreadcrumbNavbar";
import { getArtistDetail } from "@/lib/artists/artists";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const artist = await getArtistDetail(Number(id));

  return (
    <>
      <BreadcrumbNavbar
        items={[
          { label: "홈", href: "/" },
          { label: "아티스트 목록", href: "/artists" },
          { label: artist.artistName },
        ]}
      />
      <ArtistDetailProfile artist={artist} artistId={Number(id)} />
      <ArtistDetailOverview artist={artist} />
      <ArtistDetailUpcoming />
      <ArtistDetailPast />
    </>
  );
}
