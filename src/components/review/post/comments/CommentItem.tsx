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
import { CommentAddUser, CommentItemProps } from "@/types/community";
import ProfileNoImage from "@/components/common/ProfileNoImage";
import { deleteComment } from "@/lib/api/community/community.client";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { formatDateKorean } from "@/utils/helpers/formatters";
import CommentPagination from "@/components/review/post/comments/CommentPagination";
import { useEffect, useState } from "react";
import { getCommentsList } from "@/lib/api/concerts/concerts.client";

export default function CommentItem({
  postId,
  comments: initialComments,
  totalPages: initialTotalPages,
}: CommentItemProps) {
  /**
   * TODO:
   * - 댓글 목록 map 로직은 상위 컴포넌트로 이동
   * - 이 컴포넌트는 단일 댓글(Comment) props만 받도록 리팩터링
   * - 글자수 제한
   */
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [comments, setComments] = useState(initialComments);
  const [totalPages, setTotalPages] = useState(initialTotalPages);

  // TODO : 댓글 수정 기능
  // const handlerEdit = () => {};

  const handlerDelete = async (targetCommentId: string) => {
    try {
      const success = await deleteComment({
        postId: String(postId),
        commentId: String(targetCommentId),
      });

      if (success) {
        // TODO : 삭제 여부 한 번 더 체크하는 모달
        toast.success("댓글이 삭제되었습니다!");
        router.refresh();
      } else {
        toast.error("삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("삭제 중 에러 발생:", error);

      toast.error("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  // 페이지 바뀔 때마다 댓글 다시 가져오기
  useEffect(() => {
    const fetchComments = async () => {
      const res = await getCommentsList({ postId: Number(postId), page: currentPage });
      if (res) {
        setComments((res.content as CommentAddUser[]) || []);
        setTotalPages(res.totalPages || 0);
      }
    };

    fetchComments();
  }, [currentPage, postId]);

  // 댓글이 없을 때
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
        const normalizeDate = (iso: string) => iso.split(".")[0];
        const formattedDate = formatDateKorean(normalizeDate(comment.createdDate));

        return (
          <Item key={comment.commentId} className="p-0">
            <ItemContent className={cn(!isLast && "border-border border-b pb-6")}>
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={comment.avatar} alt={comment.author} />
                  <AvatarFallback>
                    <ProfileNoImage size="xs" />
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className={"flex items-center gap-4"}>
                      <span>{comment.author}</span>
                      <span className={"text-text-sub text-xs"}>{formattedDate}</span>
                    </div>

                    {comment.isMyComment ? (
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
                          {/* TODO : 댓글 수정하기
                            <DropdownMenuItem onClick={handlerEdit}>수정하기</DropdownMenuItem>
                            */}
                          <DropdownMenuItem
                            onClick={() => handlerDelete(String(comment.commentId))}
                          >
                            삭제하기
                          </DropdownMenuItem>
                          {/**
                           * TODO: 신고하기
                           * - 작성자 본인 권한
                           *  <DropdownMenuItem>신고하기</DropdownMenuItem>
                           */}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : null}
                  </div>

                  <p>{comment.content}</p>

                  {/**
                   * // TODO: 댓글 좋아요 구현
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

      <CommentPagination totalPages={totalPages} />
    </>
  );
}
