import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import HotTrack from "@/components/artist/HotTrack";
import QuickStat from "@/components/artist/QuickStat";
import ArtistAbout from "@/components/artist/ArtistAbout";
import Discography from "@/components/artist/Discography";
import ArtistProfile from "@/components/artist/ArtistProfile";
import SimilarArtists from "@/components/artist/SimilarArtists";

{
  /*TODO: 하드코딩 한 부분 나중에 바꿔 끼우기*/
}

export default function page() {
  return (
    <>
      <nav className={"px-13 py-4"}>
        <Breadcrumb className={"mx-auto max-w-400"}>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={"/home"}>홈</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={"/artists"}>아티스트 목록</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>아티스트</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>
      {/*프로필 파트*/}
      <ArtistProfile />
      {/*Overview 파트*/}
      <section className={"mx-auto flex w-full max-w-400 gap-12 py-16"}>
        {/*왼쪽 파트*/}
        <div className={"flex flex-col gap-12"}>
          <ArtistAbout />
          <Discography />
        </div>
        {/*오른쪽 파트*/}
        <div className={"flex w-125 shrink-0 flex-col gap-12"}>
          <QuickStat />
          <HotTrack />
          <SimilarArtists />
        </div>
      </section>
    </>
  );
}
