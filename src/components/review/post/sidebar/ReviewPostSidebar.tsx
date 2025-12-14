import AuthorCard from "@/components/review/post/sidebar/AuthorCard";
import RelatedPosts from "@/components/review/post/sidebar/RelatedPosts";
import SharePosts from "@/components/review/post/sidebar/SharePosts";

export default function ReviewPostSidebar() {
  return (
    <aside className={"sticky top-34 flex w-125 shrink-0 flex-col gap-12 self-start"}>
      <AuthorCard />
      <RelatedPosts />
      <SharePosts />
    </aside>
  );
}
