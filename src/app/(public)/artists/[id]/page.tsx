import ArtistDetailProfile from "@/components/artist/detail/ArtistDetailProfile";
import ArtistDetailOverview from "@/components/artist/detail/ArtistDetailOverview";
import ArtistDetailUpcoming from "@/components/artist/detail/ArtistDetailUpcoming";
import ArtistDetailPast from "@/components/artist/detail/ArtistDetailPast";
import BreadcrumbNavbar from "@/components/review/BreadcrumbNavbar";
import { getArtistDetail, getArtistLikeStatus } from "@/lib/api/artists/artists.server";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const artistId = Number(id);

  const [artist, initialIsLiked] = await Promise.all([
    getArtistDetail(artistId),
    getArtistLikeStatus(artistId),
  ]);

  if (!artist) return null;

  return (
    <>
      <BreadcrumbNavbar
        items={[
          { label: "홈", href: "/" },
          { label: "아티스트 목록", href: "/artists" },
          { label: artist.nameKo ?? artist.artistName },
        ]}
      />
      <ArtistDetailProfile artist={artist} artistId={Number(id)} initialIsLiked={initialIsLiked} />
      <ArtistDetailOverview artist={artist} />
      <ArtistDetailUpcoming />
      <ArtistDetailPast />
    </>
  );
}
