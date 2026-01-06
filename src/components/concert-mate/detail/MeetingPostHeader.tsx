"use client";

import { Clock4, MoreHorizontalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MeetingPostHeaderProps } from "@/types/community/concert-mate";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatDateKorean } from "@/utils/helpers/formatters";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { closeMatePost, deleteMatePost } from "@/lib/api/community/concert-mate/mate.client";

const normalizeDate = (iso: string) => iso.split(".")[0];

export default function MeetingPostHeader({
  postDetail,
  isAuthor,
  isOpen,
}: MeetingPostHeaderProps) {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const isModified =
    normalizeDate(postDetail.createdDate) !== normalizeDate(postDetail.modifiedDate);
  const displayDate = formatDateKorean(
    normalizeDate(isModified ? postDetail.modifiedDate : postDetail.createdDate)
  );

  // TODO: 아래 수정 주소는 동행구인 변경 주소로 변경해주세요
  const handleModify = () => {
    router.push(`/concerts/${postDetail.concertId}/review/${postDetail.postId}/edit`);
  };

  const handleDelete = async () => {
    try {
      await deleteMatePost({ postId: postDetail.postId });

      setDeleteDialogOpen(false); // 모달 닫기
      toast.success("게시글이 삭제되었습니다.");
      router.push(`/concert-mate`); // 삭제 후 이동
    } catch (error) {
      setDeleteDialogOpen(false);

      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("게시글을 삭제하지 못했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  // TODO : close된 게시글 감추기 등 정책 추가 고려
  const handlerClosed = async () => {
    try {
      // 서버에 상태 변경 요청
      const success = await closeMatePost({
        postId: postDetail.postId,
      });

      if (success) {
        toast.success("동행 구인 모집을 마감했습니다.");
        router.refresh();
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("마감 처리 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <header className={"flex flex-col gap-4"}>
      <h1 className={"text-4xl"}>{postDetail.title}</h1>

      <div className={"flex justify-between"}>
        <div className={"flex gap-6"}>
          <div className={"text-text-sub flex gap-6"}>
            <div className={"flex items-center gap-2"}>
              <Clock4 size={14} />
              <p>
                {displayDate}
                {isModified && <span className="ml-1 text-xs">(수정됨)</span>}
              </p>
            </div>
          </div>
        </div>

        {isAuthor ? (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-text-sub cursor-pointer hover:bg-transparent"
                aria-label="더보기 옵션"
              >
                <MoreHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-40" align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={handleModify}>수정하기</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDeleteDialogOpen(true)}>
                  삭제하기
                </DropdownMenuItem>
                {/* closing 되면 완료하기 버튼 사라짐 */}
                {isOpen && <DropdownMenuItem onClick={handlerClosed}>완료하기</DropdownMenuItem>}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-text-sub cursor-pointer hover:bg-transparent"
                aria-label="더보기 옵션"
              >
                <MoreHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-40" align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => toast("신고 기능은 준비 중입니다. 조금만 기다려 주세요.")}
                >
                  신고하기
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>게시글을 삭제하시겠어요?</AlertDialogTitle>
            <AlertDialogDescription>
              작성된 글은 즉시 삭제되며, 복구할 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <Button variant="destructive" onClick={handleDelete}>
              삭제
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
}
