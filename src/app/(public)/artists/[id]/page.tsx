import ArtistDetailProfile from "@/components/artist/detail/ArtistDetailProfile";
import ArtistDetailOverview from "@/components/artist/detail/ArtistDetailOverview";
import ArtistDetailUpcoming from "@/components/artist/detail/ArtistDetailUpcoming";
import ArtistDetailPast from "@/components/artist/detail/ArtistDetailPast";
import BreadcrumbNavbar from "@/components/review/BreadcrumbNavbar";

{
  /*TODO: 하드코딩 한 부분 나중에 바꿔 끼우기*/
}

export default function page() {
  return (
    <>
      <BreadcrumbNavbar
        items={[
          { label: "홈", href: "/" },
          { label: "아티스트 목록", href: "/artists" },
          { label: "아티스트" },
        ]}
      />
      <ArtistDetailProfile />
      <ArtistDetailOverview />
      <ArtistDetailUpcoming />
      <ArtistDetailPast />
    </>
  );
}
