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
import { formatDateKorean } from "@/utils/helpers/formatters";
import { ReviewPost } from "@/types/community/concert-review";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { deleteReviewPost } from "@/lib/api/community/concert-review/review.client";

interface PostHeaderProps {
  isAuthor: boolean;
  post: ReviewPost;
}

const normalizeDate = (iso: string) => iso.split(".")[0];

export default function ReviewPostHeader({ isAuthor, post }: PostHeaderProps) {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const isModified = normalizeDate(post.createdDate) !== normalizeDate(post.modifiedDate);
  const displayDate = formatDateKorean(
    normalizeDate(isModified ? post.modifiedDate : post.createdDate)
  );

  // TODO: 아래 수정 주소는 동행구인 변경 주소로 변경해주세요
  const handleModify = () => {
    router.push(`/concerts/${post.concertId}/review/${post.postId}/edit`);
  };

  const handleDelete = async () => {
    try {
      await deleteReviewPost(post.postId);

      setDeleteDialogOpen(false); // 모달 닫기
      toast.success("리뷰가 삭제되었습니다.");
      router.push(`/concerts/${post.concertId}`); // 삭제 후 이동
    } catch (error) {
      setDeleteDialogOpen(false);

      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("리뷰를 삭제하지 못했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };
  return (
    <header className={"flex flex-col gap-4"}>
      <h1 className={"text-4xl"}>{post.title}</h1>

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
            <AlertDialogTitle>리뷰를 삭제하시겠어요?</AlertDialogTitle>
            <AlertDialogDescription>
              작성된 리뷰는 즉시 삭제되며, 복구할 수 없습니다.
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
