import CommentInput from "@/components/review/post/comments/CommentInput";
import CommentItem from "@/components/review/post/comments/CommentItem";
import { getCommentsList } from "@/lib/api/community/community.server";
import { getUserInfo } from "@/lib/api/user/user.server";
import { cookies } from "next/headers";

export default async function ReviewPostComments({ postId }: { postId: string }) {
  const postIdNum = Number(postId) || 1;

  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has("ACCESS_TOKEN");

  // TODO : page 수정
  const res = await getCommentsList({ postId: postIdNum, page: 1 });
  const comments = res?.content || [];

  // 유저 정보 합치기
  const userIds = Array.from(new Set(comments.map((c) => c.userId)));
  const userProfiles = await Promise.all(userIds.map((id) => getUserInfo(id)));

  const enrichedComments = comments.map((comment) => {
    const user = userProfiles.find((u) => u.id === comment.userId);
    return {
      ...comment,
      author: user?.nickname || "알 수 없는 사용자",
      avatar: user?.profileImageUrl || "",
    };
  });

  const totalComments = res?.totalElements || 0;

  return (
    <div className={"flex flex-col gap-6"}>
      <CommentInput isLoggedIn={isLoggedIn} totalComments={totalComments} />
      <CommentItem res={res} comments={enrichedComments} />
    </div>
  );
}
