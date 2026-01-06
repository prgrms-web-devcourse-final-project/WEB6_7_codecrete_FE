import CommentInput from "@/components/review/post/comments/CommentInput";
import CommentItem from "@/components/review/post/comments/CommentItem";
import { getAuthStatus } from "@/lib/api/auth/auth.server";
import { getCommentsList } from "@/lib/api/community/community.server";
import { getUserInfo, getUsersMe } from "@/lib/api/user/user.server";
import { compareDesc } from "date-fns";

export default async function ReviewPostComments({ postId }: { postId: string }) {
  const postIdNum = Number(postId) || 1;

  const isLoggedIn = await getAuthStatus();

  // TODO : page 수정
  const res = await getCommentsList({ postId: postIdNum, page: 1 });
  const comments = res?.content || [];

  const currentUser = isLoggedIn ? await getUsersMe() : null;
  const currentUserId = currentUser?.id;

  // 유저 정보 합치기
  const userIds = Array.from(new Set(comments.map((c) => c.userId)));
  const userProfiles = await Promise.all(userIds.map((id) => getUserInfo(id)));

  const enrichedComments = comments
    .map((comment) => {
      const user = userProfiles.find((u) => u?.id === comment.userId);
      return {
        ...comment,
        author: user?.nickname || "알 수 없는 사용자",
        avatar: user?.profileImageUrl || "",
        // 댓글 본인 여부 확인
        isMyComment: String(comment.userId) === String(currentUserId),
      };
    })
    .sort((a, b) => compareDesc(new Date(a.createdDate), new Date(b.createdDate)));

  const totalComments = res?.totalElements || 0;

  return (
    <div className={"flex flex-col gap-6"}>
      <CommentInput
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        totalComments={totalComments}
        postId={postId}
      />
      <CommentItem res={res} comments={enrichedComments} postId={postId} />
    </div>
  );
}
