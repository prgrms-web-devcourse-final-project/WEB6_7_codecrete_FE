import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ProfileNoImage from "../common/ProfileNoImage";
import { PostItemPage } from "@/types/my-page";
import { User } from "@/types/user";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { ko } from "date-fns/locale";
import { Badge } from "../ui/badge";
import { StickyNoteIcon } from "lucide-react";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "../ui/empty";

export default function MyPagePostList({ user, posts }: { user: User; posts?: PostItemPage[] }) {
  return (
    <div className="flex flex-col gap-4">
      {posts?.length === 0 && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <StickyNoteIcon />
            </EmptyMedia>
            <EmptyTitle>작성한 게시물이 없습니다.</EmptyTitle>
            <EmptyDescription>커뮤니티에서 활동을 시작해보세요!</EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
      {posts?.map((post) => (
        <Link
          key={post.postId}
          href={
            post.category === "REVIEW"
              ? `/concerts/${post.concertId}`
              : `/concert-mate/${post.postId}`
          }
          className="border-border hover:bg-accent/50 group flex flex-col gap-4 rounded-2xl border p-6"
        >
          <div className="flex justify-between gap-4">
            <Avatar className="ring-border size-10 ring-4">
              <AvatarImage src={user.profileImageUrl} alt={user.nickname} />
              <AvatarFallback>
                <ProfileNoImage size="sm" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between gap-1">
                <strong className="text-text-main text-sm font-semibold">{user.nickname}</strong>
                <Badge variant="outline" className="px-2 py-1">
                  {post.category === "REVIEW" ? "공연 후기" : "동행 구인"}
                </Badge>
              </div>
              <p className="text-text-sub text-xs leading-normal lg:text-sm">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                  locale: ko,
                })}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-text-main text-base font-semibold lg:text-lg">{post.title}</h4>
            <p className="text-text-sub line-clamp-4 text-sm break-keep lg:text-base">
              {post.content}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
