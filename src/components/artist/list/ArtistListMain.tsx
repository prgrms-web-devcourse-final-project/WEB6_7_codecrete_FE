import { getArtists } from "@/lib/artists/artists.client";
import { cookies } from "next/headers";
import ArtistListClient from "@/components/artist/list/ArtistListClient";

export default async function ArtistListMain({ currentSort = "NAME" }: { currentSort?: string }) {
  // 초기 로드는 서버함수로 사용해서
  const cookieStore = await cookies();

  const initialArtists = await getArtists(0, 20, currentSort, cookieStore.toString());

  return (
    <section className={"bg-bg-main flex justify-center px-15 py-16"}>
      <div className={"flex w-full max-w-400 flex-col gap-8"}>
        <ArtistListClient initialArtists={initialArtists} initialSort={currentSort} />
      </div>
    </section>
  );
}
