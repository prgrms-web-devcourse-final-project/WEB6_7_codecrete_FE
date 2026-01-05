import ConcertListContent from "@/components/concert/list/ConcertListContent";
import { totalConcertCount } from "@/lib/api/concerts/concerts.server";

async function getConcerts(sortType: string = "REGISTERED") {
  // 기본 : 최신 등록순 순 정렬
  // TODO : sort가 변경될 떄도 스켈레톤이 뜨게 함
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/concerts/list/${sortType}?page=0&size=12`
  );

  if (!res.ok) {
    throw new Error("데이터 패치 실패");
  }

  return res.json();
}

export default async function ConcertListWrapper({
  searchParams,
}: {
  searchParams: { sort?: string };
}) {
  const sortType = searchParams.sort;

  const res = await getConcerts(sortType);
  const initialList = res.data;

  const totalCount = await totalConcertCount();

  return (
    <ConcertListContent
      initialList={initialList || []}
      sortType={sortType}
      totalCount={totalCount}
    />
  );
}
