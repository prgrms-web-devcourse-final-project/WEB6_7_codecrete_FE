"use client";

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
import { MoreHorizontalIcon } from "lucide-react";
import LoadMoreBtn from "@/components/common/LoadMoreBtn";
import { CommentAddUser, CommentResponse } from "@/types/community";
import ProfileNoImage from "@/components/common/ProfileNoImage";
import { format } from "date-fns";

export default function CommentItem({
  res,
  comments,
}: {
  res: CommentResponse | null;
  comments: CommentAddUser[] | undefined;
}) {
  /**
   * TODO:
   * - 댓글 목록 map 로직은 상위 컴포넌트로 이동
   * - 이 컴포넌트는 단일 댓글(Comment) props만 받도록 리팩터링
   * - 페이지네이션
   * - 한 번에 보여줄 갯수 지정
   */
  const handlerEdit = () => {};
  const handlerDelete = () => {};

  // 댓글이 하나도 없을 때
  if (!comments || comments.length === 0) {
    return (
      <div className="text-text-sub text-md bg-bg-sub flex justify-center rounded-md py-5">
        <span>댓글을 작성해주세요</span>
      </div>
    );
  }

  // 댓글이 있을 때
  return (
    <>
      {comments?.map((comment, index) => {
        const isLast = index === comments.length - 1;
        const formattedDate = format(new Date(comment.createdDate), "yyyy-MM-dd");

        return (
          <Item key={comment.commentId} className="p-0">
            <ItemContent className={cn(!isLast && "border-border border-b pb-6")}>
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={comment.avatar} alt={comment.author} />
                  <AvatarFallback>
                    <ProfileNoImage size="xs" />
                  </AvatarFallback>
                  {/* <AvatarFallback>{comment.author[0]}</AvatarFallback> */}
                </Avatar>

                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className={"flex items-center gap-4"}>
                      <span>{comment.author}</span>
                      <span className={"text-text-sub text-xs"}>{formattedDate}</span>
                    </div>
                    {/**
                     * TODO:
                     * - 작성자 본인/비본인 권한에 따라 메뉴 항목 분기
                     *   (수정/삭제 vs 안 보이기)
                     */}
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
                         * TODO: 신고하기
                         * - 작성자 본인 권한
                         */}
                        <DropdownMenuItem>신고하기</DropdownMenuItem>
                        <DropdownMenuItem onClick={handlerEdit}>수정하기</DropdownMenuItem>
                        <DropdownMenuItem onClick={handlerDelete}>삭제하기</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <p>{comment.content}</p>

                  {/**
                   * TODO: 댓글 좋아요 구현
                   * - 좋아요 API 연동 및 토글 상태 처리
                   * - 이미 좋아요한 경우 아이콘 상태 변경
                    <div className="text-text-sub flex items-center gap-1 text-xs">
                    <Heart size={12} />
                    {comment.likes}
                  </div>
                   */}
                </div>
              </div>
            </ItemContent>
          </Item>
        );
      })}

      {/* 임시 */}
      <div className={"flex justify-center"}>{res?.hasNext && <LoadMoreBtn />}</div>
    </>
  );
}
