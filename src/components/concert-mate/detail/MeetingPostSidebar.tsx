import MeetingDetail from "@/components/concert-mate/detail/MeetingDetail";
import SharePosts from "@/components/review/post/sidebar/SharePosts";
import MeetingAuthorCard from "@/components/concert-mate/detail/MeetingAuthorCard";
import { MeetingPostSidebarProps } from "@/types/community/concert-mate";

export default function MeetingPostSidebar({
  showMeetingDetail,
  userDetail,
  res,
}: MeetingPostSidebarProps) {
  return (
    <aside className={"sticky top-34 flex w-125 shrink-0 flex-col gap-12 self-start"}>
      <MeetingAuthorCard userDetail={userDetail} />
      {showMeetingDetail && <MeetingDetail res={res} />}
      <SharePosts />
    </aside>
  );
}
