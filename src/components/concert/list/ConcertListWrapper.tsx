import ConcertListContent from "@/components/concert/list/ConcertListContent";

async function getConcerts(sortType: string = "LIKE") {
  // 기본 : 좋아요 순 정렬
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

  return <ConcertListContent initialList={initialList || []} sortType={sortType} />;
}
