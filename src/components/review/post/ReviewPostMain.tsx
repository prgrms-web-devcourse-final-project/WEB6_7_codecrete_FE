import { Separator } from "@/components/ui/separator";
import ReviewPostHeader from "@/components/review/post/header/ReviewPostHeader";
import ReviewConcertCard from "@/components/review/post/info/ReviewConcertCard";
import ReviewPostBody from "@/components/review/post/body/ReviewPostBody";
import ReviewPostComments from "@/components/review/post/comments/ReviewPostComments";
import ReviewPostSidebar from "@/components/review/post/sidebar/ReviewPostSidebar";
import { ConcertDetail } from "@/types/concerts";
import { ReviewDetailData } from "@/types/community/concert-review";

// TODO: 똑같이 구현하기 위해선 아래 세 개의 데이터가 필요합니다

export default function ReviewPostMain({
  concertDetail,
  reviewDetail,
  isAuthor,
}: {
  concertDetail: ConcertDetail;
  // TODO: 아래 ReviewDetailData는 동행구인 상세 데이터 타입으로 변경하셔야해요
  reviewDetail: ReviewDetailData;
  isAuthor: boolean;
}) {
  return (
    <section className={"px-15 py-16"}>
      <div className="mx-auto flex w-full max-w-400 gap-12">
        {/*왼쪽 파트*/}
        <section className={"flex w-full flex-col gap-8"}>
          <ReviewConcertCard concertDetail={concertDetail} />
          {/*TODO: 아래에서 전달하는 post 타입은 구인글이나 후기글 상세 조회에서 동일한 타입입니다*/}
          <ReviewPostHeader post={reviewDetail.post} isAuthor={isAuthor} />
          <Separator />
          <ReviewPostBody reviewDetail={reviewDetail} />
          <ReviewPostComments />
        </section>
        {/*오른쪽 파트*/}
        <ReviewPostSidebar authorId={reviewDetail.post.userId} />
      </div>
    </section>
  );
}
