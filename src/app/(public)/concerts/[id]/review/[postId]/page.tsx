import BreadcrumbNavbar from "@/components/review/BreadcrumbNavbar";
import ReviewPostMain from "@/components/review/post/ReviewPostMain";
import { getConcertDetail } from "@/lib/api/concerts/concerts.server";
import { notFound } from "next/navigation";
import { getReviewDetail } from "@/lib/api/community/concert-review/review.server";
import { getUsersMe } from "@/lib/api/user/user.server";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; postId: string }>;
}) {
  const { id, postId } = await params;
  const concertDetail = await getConcertDetail({ concertId: id });
  const reviewDetail = await getReviewDetail(Number(postId));
  const userMe = await getUsersMe();

  if (!concertDetail || !reviewDetail) {
    notFound();
  }

  // TODO: 글 작성자인지 판단하는 변수
  const isAuthor = userMe !== null && userMe.id === reviewDetail.post.userId;

  return (
    <>
      <BreadcrumbNavbar
        items={[
          { label: "홈", href: "/" },
          { label: "공연 목록", href: "/concerts" },
          { label: concertDetail.name, href: `/concerts/${id}` },
          { label: "리뷰 상세" },
        ]}
      />
      <ReviewPostMain
        concertDetail={concertDetail}
        reviewDetail={reviewDetail}
        isAuthor={isAuthor}
      />
    </>
  );
}
