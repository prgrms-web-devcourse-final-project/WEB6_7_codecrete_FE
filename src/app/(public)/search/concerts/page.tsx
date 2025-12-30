import SearchConcerts from "@/components/search/SearchConcerts";
import { getSearchConcertsServer } from "@/lib/api/search.server";
import { getAuthStatus } from "@/lib/auth/auth.server";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ keyword: string }>;
}) {
  const { keyword } = await searchParams;
  const isAuthenticated = await getAuthStatus();

  const concerts = await getSearchConcertsServer({ keyword: keyword, isAuthenticated });

  return (
    <SearchConcerts
      initialConcerts={concerts}
      keyword={keyword}
      isAuthenticated={isAuthenticated}
    />
  );
}
