import SearchConcerts from "@/components/search/SearchConcerts";
import { getAuthStatus } from "@/lib/api/auth/auth.server";
import { getSearchConcerts } from "@/lib/api/search/search.server";

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
