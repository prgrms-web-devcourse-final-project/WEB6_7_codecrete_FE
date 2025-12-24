import ArtistListFilters from "@/components/artist/list/ArtistListFilters";
import ArtistListItems from "@/components/artist/list/ArtistListItems";
import { getArtists } from "@/lib/artists/artists";

export default async function ArtistListMain() {
  const artists = await getArtists();

  return (
    <section className={"bg-bg-main flex justify-center px-15 py-16"}>
      <div className={"flex w-full max-w-400 flex-col gap-8"}>
        <ArtistListFilters />
        <ArtistListItems artists={artists} />
      </div>
    </section>
  );
}
