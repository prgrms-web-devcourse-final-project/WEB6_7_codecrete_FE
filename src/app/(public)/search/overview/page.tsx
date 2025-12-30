import SearchArtistPreview from "@/components/search/SearchArtistPreview";
import SearchConcertPreview from "@/components/search/SearchConcertPreview";
import { cn } from "@/lib/utils";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ keyword: string }>;
}) {
  const { keyword } = await searchParams;

  return (
    <section className={cn("flex flex-col gap-16 px-15 py-16")}>
      {/* TODO : 한줄 이상은 사라지도록 해야함 */}
      <SearchArtistPreview keyword={keyword} />
      <SearchConcertPreview keyword={keyword} />
    </section>
  );
}
