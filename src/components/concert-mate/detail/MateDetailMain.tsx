import ReviewPostComments from "@/components/review/post/comments/ReviewPostComments";
import MeetingConcertCard from "@/components/concert-mate/detail/MeetingConcertCard";
import MeetingPostHeader from "@/components/concert-mate/detail/MeetingPostHeader";
import MeetingPostBody from "@/components/concert-mate/detail/MeetingPostBody";
import MeetingPostSidebar from "@/components/concert-mate/detail/MeetingPostSidebar";
import { MateDetailMainProps } from "@/types/community/concert-mate";
import MobileMeetingPostSidebar from "./MobileMeetingPostSidebar";

export default function MateDetailMain({
  postId,
  res,
  concertDetail,
  userDetail,
  isAuthor,
  isLiked,
}: MateDetailMainProps) {
  const isOpen = res?.status === "OPEN";

  return (
    <section className="px-5 py-6 lg:px-15 lg:py-16">
      <div className="mx-auto flex w-full max-w-400 flex-col gap-5 lg:flex-row lg:gap-8">
        {/*왼쪽 파트*/}
        <div className={"flex w-full flex-col gap-12"}>
          <MeetingConcertCard concertDetail={concertDetail} />
          <div className={"border-border flex w-full flex-col gap-4 border-y py-8 lg:py-4"}>
            <MeetingPostHeader postDetail={res.post} isAuthor={isAuthor} isOpen={isOpen} />
            <MeetingPostBody postDetail={res.post} initialIsLiked={isLiked} isOpen={isOpen} />
          </div>
          <ReviewPostComments postId={postId} />
        </div>
        {/* === 데스크톱 사이드바 === */}
        <div className="hidden lg:block lg:max-w-125 lg:flex-1">
          <div className="sticky top-30 hidden max-w-125 min-w-80 shrink-0 flex-col gap-12 self-start lg:flex">
            <MeetingPostSidebar showMeetingDetail={true} userDetail={userDetail} res={res} />
          </div>
        </div>
      </div>
      {/* === 모바일 사이드바 === */}
      <MobileMeetingPostSidebar showMeetingDetail={true} userDetail={userDetail} res={res} />
    </section>
  );
}
