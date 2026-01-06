import { Separator } from "@/components/ui/separator";
import ReviewPostHeader from "@/components/review/post/header/ReviewPostHeader";
import ReviewConcertCard from "@/components/review/post/info/ReviewConcertCard";
import ReviewPostBody from "@/components/review/post/body/ReviewPostBody";
import ReviewPostComments from "@/components/review/post/comments/ReviewPostComments";
import ReviewPostSidebar from "@/components/review/post/sidebar/ReviewPostSidebar";
import { ConcertDetail } from "@/types/concerts";
import { ReviewDetailData } from "@/types/community/concert-review";

export default function ReviewPostMain({
  concertDetail,
  reviewDetail,
  isAuthor,
  postId,
  isLiked,
}: {
  concertDetail: ConcertDetail;
  reviewDetail: ReviewDetailData;
  isAuthor: boolean;
  postId: string;
  isLiked: boolean;
}) {
  return (
    <section className={"px-15 py-16"}>
      <div className="mx-auto flex w-full max-w-400 gap-12">
        {/*왼쪽 파트*/}
        <section className={"flex w-full flex-col gap-8"}>
          <ReviewConcertCard concertDetail={concertDetail} />
          <ReviewPostHeader post={reviewDetail.post} isAuthor={isAuthor} />
          <Separator />
          <ReviewPostBody reviewDetail={reviewDetail} initialIsLiked={isLiked} />
          <ReviewPostComments postId={postId} />
        </section>
        {/*오른쪽 파트*/}
        <ReviewPostSidebar authorId={reviewDetail.post.userId} />
      </div>
    </section>
  );
}
