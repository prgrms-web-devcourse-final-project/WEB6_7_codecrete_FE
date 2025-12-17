import MeetingDetail from "@/components/concert-mate/detail/MeetingDetail";
import AuthorCard from "@/components/review/post/sidebar/AuthorCard";
import RelatedPosts from "@/components/review/post/sidebar/RelatedPosts";
import SharePosts from "@/components/review/post/sidebar/SharePosts";

type PostSidebar = {
  showMeetingDetail: boolean;
};

export default function ReviewPostSidebar({ showMeetingDetail }: PostSidebar) {
  return (
    <aside className={"sticky top-34 flex w-125 shrink-0 flex-col gap-12 self-start"}>
      <AuthorCard />
      {/**
       * 동행 구인 페이지 전용
       * - props로 true 전달
       */}
      {showMeetingDetail && <MeetingDetail />}
      <RelatedPosts />
      <SharePosts />
    </aside>
  );
}
