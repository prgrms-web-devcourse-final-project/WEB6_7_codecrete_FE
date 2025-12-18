import { twMerge } from "tailwind-merge";
import SearchArtistPreview from "@/components/search/SearchArtistPreview";
import SearchConcertPreview from "@/components/search/SearchConcertPreview.";

export default function SearchMain() {
  return (
    <section className={twMerge(`flex flex-col gap-16 px-15 py-16`)}>
      {/* TODO : 한줄 이상은 사라지도록 해야함 */}
      <SearchArtistPreview />
      <SearchConcertPreview />
    </section>
  );
}
