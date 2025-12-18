import ReviewPostBody from "@/components/review/post/body/ReviewPostBody";
import ReviewPostComments from "@/components/review/post/comments/ReviewPostComments";
import ReviewPostHeader from "@/components/review/post/header/ReviewPostHeader";
import ReviewConcertCard from "@/components/review/post/info/ReviewConcertCard";
import { Separator } from "@/components/ui/separator";
import ReviewPostSidebar from "@/components/review/post/sidebar/ReviewPostSidebar";

export default function MateDetailMain() {
  return (
    <section className="px-15 py-16">
      <div className="mx-auto flex w-full max-w-400 gap-12">
        {/*왼쪽 파트*/}
        <section className="flex w-full flex-col gap-8">
          <ReviewConcertCard />
          <ReviewPostHeader />
          <Separator />
          <ReviewPostBody showBadge={true} />
          <ReviewPostComments />
        </section>
        {/*오른쪽 파트*/}
        <ReviewPostSidebar showMeetingDetail={true} />
      </div>
    </section>
  );
}
