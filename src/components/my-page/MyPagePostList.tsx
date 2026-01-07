import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ProfileNoImage from "../common/ProfileNoImage";
import { PostItemPage } from "@/types/my-page";
import { User } from "@/types/user";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { ko } from "date-fns/locale";
import { Badge } from "../ui/badge";

export default function MyPagePostList({ user, posts }: { user: User; posts?: PostItemPage[] }) {
  return (
    <div className="flex flex-col gap-4">
      {posts?.map((post) => (
        <Link
          key={post.postId}
          href="#"
          className="border-border flex cursor-pointer justify-between gap-4 rounded-xl border p-6"
        >
          <div className="flex justify-between">
            <Avatar className="size-10">
              <AvatarImage src={user.profileImageUrl} alt="아티스트" />
              <AvatarFallback>
                <ProfileNoImage size="sm" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between gap-1">
                <strong className="text-text-main text-base font-semibold">{user.nickname}</strong>
                <Badge variant="outline" className="px-2 py-1">
                  {post.category === "REVIEW" ? "공연 후기" : "동행 구인"}
                </Badge>
              </div>
              <p className="text-text-sub text-xs">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                  locale: ko,
                })}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-text-main text-lg font-bold">{post.title}</h4>
              <p className="text-text-sub line-clamp-3">{post.content}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
