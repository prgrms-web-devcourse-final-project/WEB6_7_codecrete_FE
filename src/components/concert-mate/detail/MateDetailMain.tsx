import ReviewPostComments from "@/components/review/post/comments/ReviewPostComments";
import { Separator } from "@/components/ui/separator";
import MeetingConcertCard from "@/components/concert-mate/detail/MeetingConcertCard";
import MeetingPostHeader from "@/components/concert-mate/detail/MeetingPostHeader";
import MeetingPostBody from "@/components/concert-mate/detail/MeetingPostBody";
import MeetingPostSidebar from "@/components/concert-mate/detail/MeetingPostSidebar";

export default function MateDetailMain({ postId }: { postId: string }) {
  return (
    <section className="px-15 py-16">
      <div className="mx-auto flex w-full max-w-400 gap-12">
        {/*왼쪽 파트*/}
        <section className="flex w-full flex-col gap-8">
          <MeetingConcertCard />
          <MeetingPostHeader />
          <Separator />
          <MeetingPostBody showBadge={true} />
          <ReviewPostComments postId={postId} />
        </section>
        {/*오른쪽 파트*/}
        <MeetingPostSidebar showMeetingDetail={true} />
      </div>
    </section>
  );
}
