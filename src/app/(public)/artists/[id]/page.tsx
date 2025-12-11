import ArtistDetailProfile from "@/components/artist/ArtistDetailProfile";
import ArtistDetailNavbar from "@/components/artist/ArtistDetailNavbar";
import ArtistDetailOverview from "@/components/artist/ArtistDetailOverview";
import ArtistDetailUpcoming from "@/components/artist/ArtistDetailUpcoming";
import ArtistDetailPast from "@/components/artist/ArtistDetailPast";

{
  /*TODO: 하드코딩 한 부분 나중에 바꿔 끼우기*/
}

export default function page() {
  return (
    <>
      <ArtistDetailNavbar />
      <ArtistDetailProfile />
      <ArtistDetailOverview />
      <ArtistDetailUpcoming />
      <ArtistDetailPast />
    </>
  );
}
