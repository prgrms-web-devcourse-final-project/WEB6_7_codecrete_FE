import { getConcertDetail } from "@/lib/api/concerts/concerts.server";
import { notFound, redirect } from "next/navigation";
import BreadcrumbNavbar from "@/components/review/BreadcrumbNavbar";
import { getUsersMe } from "@/lib/api/user/user.server";
import MateEditMain from "@/components/concert-mate/edit/MateEditMain";
import { getPostsDetail } from "@/lib/api/community/concert-mate/mate.server";
import PageHeader from "@/components/common/PageHeader";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  // 게시글 id
  const pageParam = await params;
  const postId = pageParam.id || "1";

  // 상세 조회 api
  const postDetail = await getPostsDetail({ postId: postId });

  // 콘서트 id
  const concertId = String(postDetail?.post.concertId);
  const concertDetail = await getConcertDetail({ concertId });

  // 게시글 본인 여부
  const currentUser = await getUsersMe();
  const currentUserId = currentUser?.id;
  if (postDetail?.post.userId !== currentUserId) {
    redirect(`/concert-mate/${postDetail?.post.postId}`);
  }

  if (!concertDetail || !postDetail) {
    notFound();
  }

  return (
    <>
      <BreadcrumbNavbar
        items={[
          { label: "홈", href: "/" },
          { label: "구인 게시판", href: "/concert-mate" },
          { label: concertDetail?.name, href: `/concert-mate/${postId}` },
          { label: "게시글 수정" },
        ]}
      />
      <PageHeader
        title="당신의 공연 Mate를 찾아보세요!"
        description="아티스트도, 좌석도, 취향도 맞는 Mate를 찾아보세요. 상세하게 적을수록 딱 맞는 공연 파트너를 만날 확률이 높아져요!"
      />
      <MateEditMain concertId={Number(concertId)} postId={Number(postId)} postDetail={postDetail} />
    </>
  );
}
