import { getConcertDetail } from "@/lib/api/concerts/concerts.server";
import { notFound, redirect } from "next/navigation";
import BreadcrumbNavbar from "@/components/review/BreadcrumbNavbar";
import ReviewEditMain from "@/components/review/edit/ReviewEditMain";
import { getReviewDetail } from "@/lib/api/community/concert-review/review.server";
import { getUsersMe } from "@/lib/api/user/user.server";

export default async function page({
  params,
}: {
  params: Promise<{ id: string; postId: string }>;
}) {
  const { id, postId } = await params;
  const concertDetail = await getConcertDetail({ concertId: id });
  const reviewDetail = await getReviewDetail(Number(postId));
  const me = await getUsersMe();

  if (reviewDetail?.post.userId !== me?.id) {
    redirect(`/concerts/${id}/review/${postId}`);
  }

  if (!concertDetail || !reviewDetail) {
    notFound();
  }

  return (
    <>
      <BreadcrumbNavbar
        items={[
          { label: "홈", href: "/" },
          { label: "공연 목록", href: "/concerts" },
          { label: concertDetail?.name, href: `/concerts/${id}` },
          { label: "리뷰 수정" },
        ]}
      />
      <ReviewEditMain concertId={Number(id)} postId={Number(postId)} reviewDetail={reviewDetail} />
    </>
  );
}
