import ArtistDetailProfile from "@/components/artist/detail/ArtistDetailProfile";
import ArtistDetailOverview from "@/components/artist/detail/ArtistDetailOverview";
import ArtistDetailUpcoming from "@/components/artist/detail/ArtistDetailUpcoming";
import ArtistDetailPast from "@/components/artist/detail/ArtistDetailPast";
import BreadcrumbNavbar from "@/components/review/BreadcrumbNavbar";
import { getArtistDetail, getArtistLikeStatus } from "@/lib/api/artists/artists.server";
import { getConcertsByArtistId } from "@/lib/api/concerts/concerts.server";
import { Metadata } from "next";
// TODO: 공연 목록 토글 애니메이션 적용
// - 전체 공연 보기 / 접기 시 height 변화가 자연스럽도록
// - max-height + transition 또는 framer-motion 적용 검토

// TODO: 접기 버튼 클릭 시 스크롤 포커스 보정
// - 공연 목록이 접힐 때 섹션 상단으로 scrollIntoView 처리
// - 공연 수가 많아질 경우 UX 개선 필요

// TODO: Upcoming / Past 공연 리스트 공통 컴포넌트로 분리
// - 로직(showAll, slice, 버튼 조건)이 거의 동일함
// - title, concerts props만 받는 형태로 추출 가능

// TODO: 모바일 뷰에서 기본 노출 개수 조정
// - desktop: 3개
// - mobile: 2개 또는 1개 노출 검토

// TODO: 공연 시작 날짜 기준 정렬 보장 여부 확인
// - 현재는 서버 정렬을 신뢰
// - 필요 시 프론트에서 startAt 기준 정렬 추가

// TODO: 공연 데이터 로딩 상태(Skeleton UI) 추가
// - 데이터 패칭 지연 시 Empty UI와 구분 필요

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const artistDetail = await getArtistDetail(Number(id));

  if (!artistDetail) {
    return {
      title: "아티스트를 찾을 수 없습니다",
      description: "요청한 아티스트 정보가 없습니다.",
    };
  }

  return {
    title: `${artistDetail.artistName} | 내 콘서트를 부탁해`,
    description: `아티스트 "${artistDetail.artistName}"에 대한 상세 페이지입니다. 아티스트 정보와 출연 공연 일정을 확인하고 외출 플래너를 생성해보세요!`,
    openGraph: {
      title: artistDetail.artistName,
      description: `${artistDetail.artistName} 정보`,
      images: artistDetail.profileImageUrl?.[0]
        ? [
            {
              url: artistDetail.profileImageUrl[0],
              width: 1200,
              height: 630,
              alt: artistDetail.artistName,
            },
          ]
        : [],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const artistId = Number(id);

  const [artist, initialIsLiked, upComingConcerts, pastConcerts] = await Promise.all([
    getArtistDetail(artistId),
    getArtistLikeStatus(artistId),
    // TODO: 아티스트 상세 페이지에서는
    // 예정/지난 공연을 한 번에 노출하기 위해
    // 충분히 큰 size(100)를 사용함.
    // 실제 UX에서는 최대 3개만 기본 노출되며,
    // 추후 페이지네이션 도입 시 size 조정 예정.
    getConcertsByArtistId({ artistId, type: "upcoming", page: 0, size: 100 }),
    getConcertsByArtistId({ artistId, type: "past", page: 0, size: 100 }),
  ]);

  if (!artist) return null;

  return (
    <>
      <BreadcrumbNavbar
        items={[
          { label: "홈", href: "/" },
          { label: "아티스트 목록", href: "/artists" },
          { label: artist.nameKo ?? artist.artistName },
        ]}
      />
      <ArtistDetailProfile
        artist={artist}
        artistId={Number(id)}
        initialIsLiked={initialIsLiked}
        upComingConcertCount={upComingConcerts.data?.length ?? 0}
      />
      <ArtistDetailOverview artist={artist} />
      <ArtistDetailUpcoming upComingConcerts={upComingConcerts.data} />
      <ArtistDetailPast pastConcerts={pastConcerts.data} />
    </>
  );
}
