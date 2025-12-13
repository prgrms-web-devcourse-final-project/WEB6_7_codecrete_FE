import ArtistDetailProfile from "@/components/artist/detail/ArtistDetailProfile";
import ArtistDetailNavbar from "@/components/artist/detail/ArtistDetailNavbar";
import ArtistDetailOverview from "@/components/artist/detail/ArtistDetailOverview";
import ArtistDetailUpcoming from "@/components/artist/detail/ArtistDetailUpcoming";
import ArtistDetailPast from "@/components/artist/detail/ArtistDetailPast";

{
  /*TODO: 하드코딩 한 부분 나중에 바꿔 끼우기*/
}

export default function page() {
  return (
    <>
      <BreadcrumbNav itemType="아티스트" itemDetail="김민지" />
      <ArtistDetailProfile />
      <ArtistDetailOverview />
      <ArtistDetailUpcoming />
      <ArtistDetailPast />
    </>
  );
}
