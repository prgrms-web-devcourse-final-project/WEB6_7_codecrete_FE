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
      <SearchArtistPreview keyword={keyword} />
      <SearchConcertPreview keyword={keyword} />
    </section>
  );
}
