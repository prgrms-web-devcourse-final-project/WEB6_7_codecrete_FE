"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ProfileNoImage from "@/components/common/ProfileNoImage";
import { useState } from "react";
import { toast } from "sonner";
import { createComment } from "@/lib/api/community/community.client";
import { useRouter } from "next/navigation";
import { CommentInputProps } from "@/types/community";

export default function CommentInput({
  isLoggedIn,
  currentUser,
  totalComments,
  postId,
}: CommentInputProps) {
  /**
   * TODO:
   * - 최대 글자 수 제한 및 안내 문구 추가 여부 검토
   * - 스켈레톤 처리
   */

  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    const finalComment = comment.trim();

    if (!finalComment) {
      toast.info("댓글 내용을 입력해주세요!");
      return;
    }

    setIsLoading(true);

    try {
      const isSuccess = await createComment({
        postId,
        data: { content: finalComment },
      });

      if (isSuccess) {
        toast.success("댓글이 성공적으로 등록되었습니다!");
        setComment("");
        /**
         * // TODO:
         * - 댓글 작성 성공 시 리프레시 처리 대신
         * - createComment를 통해 반환 받은 data를 보여주는 방법 사용해보기
         */
        router.refresh();
      } else {
        toast.error("등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("댓글 작성 중 에러 발생:", error);

      toast.error("서버와 통신 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 엔터 입력
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // 줄바꿈 방지
      handleSubmit(); // 등록 함수 호출
    }
  };

  return (
    <>
      <div className={"flex justify-between"}>
        <h3 className={"text-xl font-bold"}>댓글 ({totalComments})</h3>
        {/**
           * // TODO:
           * - 댓글 정렬
           <SortSelect />
           */}
      </div>
      {isLoggedIn ? (
        <div className={"flex gap-4"}>
          <Avatar className={"h-10 w-10"}>
            <AvatarImage src={currentUser?.profileImageUrl} alt="@shadcn" />
            <AvatarFallback>
              <ProfileNoImage size="xs" />
            </AvatarFallback>
          </Avatar>

          <div className={"flex flex-1 flex-col gap-3"}>
            <Textarea
              placeholder={"의견을 남기거나 질문을 작성해 주세요.\n"}
              aria-label={"댓글 입력"}
              className={"h-24 resize-none"}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className={"flex justify-between"}>
              <span className={"text-text-sub text-sm"}>
                서로를 존중하는 댓글 문화를 만들어 주세요.
              </span>
              <Button
                size={"lg"}
                aria-label={"댓글 등록"}
                disabled={!comment.trim() || isLoading}
                onClick={handleSubmit}
              >
                댓글 등록
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-text-sub text-md bg-bg-sub flex justify-center rounded-md py-5">
          <span>회원만 댓글작성 가능합니다</span>
        </div>
      )}
      <Separator />
    </>
  );
}
