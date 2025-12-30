import SearchConcerts from "@/components/search/SearchConcerts";
import { getSearchConcerts } from "@/lib/api/search/search.server";
import { getAuthStatus } from "@/lib/auth/auth.server";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ keyword: string }>;
}) {
  const { keyword } = await searchParams;
  const isAuthenticated = await getAuthStatus();

  const concerts = await getSearchConcerts({ keyword: keyword, isAuthenticated });

  return (
    <SearchConcerts
      initialConcerts={concerts}
      keyword={keyword}
      isAuthenticated={isAuthenticated}
    />
  );
}
