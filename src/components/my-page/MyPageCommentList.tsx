import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ProfileNoImage from "../common/ProfileNoImage";
import { CommentItemPage } from "@/types/my-page";
import { User } from "@/types/user";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

export default function MyPageCommentList({
  user,
  comments,
}: {
  user: User;
  comments?: CommentItemPage[];
}) {
  return (
    <div className="flex flex-col gap-4">
      {comments?.map((comment) => (
        <Link
          key={comment.commentId}
          href="#"
          className="border-border flex cursor-pointer justify-between gap-4 rounded-xl border p-6"
        >
          <div className="flex justify-between">
            <Avatar className="size-10">
              <AvatarImage src={user.profileImageUrl} alt={user.nickname} />
              <AvatarFallback>
                <ProfileNoImage size="sm" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 space-y-4">
            <div className="space-y-1">
              <strong className="text-text-main text-base font-semibold">{user.nickname}</strong>
              <p className="text-text-sub text-xs">
                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: ko })}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-text-sub line-clamp-3">{comment.content}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
