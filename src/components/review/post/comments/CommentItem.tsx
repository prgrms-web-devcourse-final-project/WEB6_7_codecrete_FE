import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Item, ItemContent } from "@/components/ui/item";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart, MoreHorizontalIcon } from "lucide-react";
import { mockComments } from "@/components/review/post/comments/comments.mock";

export default function CommentItem() {
  return (
    <>
      {/**
       * TODO:
       * - 댓글 목록 map 로직은 상위 컴포넌트로 이동
       * - 이 컴포넌트는 단일 댓글(Comment) props만 받도록 리팩터링
       */}
      {mockComments.map((comment, index) => {
        const isLast = index === mockComments.length - 1;

        return (
          <Item key={comment.id} className="p-0">
            <ItemContent className={cn(!isLast && "border-border border-b pb-6")}>
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={comment.avatar} alt={comment.author} />
                  <AvatarFallback>{comment.author[0]}</AvatarFallback>
                </Avatar>

                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className={"flex items-center gap-4"}>
                      <span>{comment.author}</span>
                      <span className={"text-text-sub text-xs"}>{comment.createdAt}</span>
                    </div>

                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-text-sub hover:bg-transparent"
                          aria-label="댓글 옵션"
                        >
                          <MoreHorizontalIcon />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-40" align="end">
                        {/**
                         * TODO:
                         * - 작성자 본인/비본인 권한에 따라 메뉴 항목 분기
                         *   (수정/삭제 vs 신고)
                         */}
                        <DropdownMenuItem>신고하기</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <p>{comment.content}</p>

                  {/**
                   * TODO:
                   * - 좋아요 API 연동 및 토글 상태 처리
                   * - 이미 좋아요한 경우 아이콘 상태 변경
                   */}
                  <div className="text-text-sub flex items-center gap-1 text-xs">
                    <Heart size={12} />
                    {comment.likes}
                  </div>
                </div>
              </div>
            </ItemContent>
          </Item>
        );
      })}

      <div className={"flex justify-center"}>
        <Button variant={"outline"} size={"lg"}>
          댓글 더 보기
        </Button>
      </div>
    </>
  );
}
