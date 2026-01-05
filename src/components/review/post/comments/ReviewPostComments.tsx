import CommentInput from "@/components/review/post/comments/CommentInput";
import CommentItem from "@/components/review/post/comments/CommentItem";
import { cookies } from "next/headers";

export default async function ReviewPostComments() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has("ACCESS_TOKEN");

  return (
    <div className={"flex flex-col gap-6"}>
      <CommentInput isLoggedIn={isLoggedIn} />
      <CommentItem />
    </div>
  );
}
