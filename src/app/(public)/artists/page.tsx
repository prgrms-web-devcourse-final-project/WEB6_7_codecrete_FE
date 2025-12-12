import ArtistListNavbar from "@/components/artist/list/ArtistListNavbar";
import ArtistListHeader from "@/components/artist/list/ArtistListHeader";
import ArtistListMain from "@/components/artist/list/ArtistListMain";

export default function page() {
  return (
    <>
      <ArtistListNavbar />
      <ArtistListHeader />
      <ArtistListMain />
    </>
  );
}
