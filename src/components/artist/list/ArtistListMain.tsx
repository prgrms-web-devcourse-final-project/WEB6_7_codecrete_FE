import ArtistListFilters from "@/components/artist/list/ArtistListFilters";
import ArtistListItems from "@/components/artist/list/ArtistListItems";

export default function ArtistListMain() {
  return (
    <section className={"bg-bg-main flex justify-center px-15 py-16"}>
      <div className={"flex w-full max-w-400 flex-col gap-8"}>
        <ArtistListFilters />
        <ArtistListItems />
      </div>
    </section>
  );
}
