import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { postLikeConcert } from "@/lib/api/concerts/concerts.client";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

interface LikeDialogProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  concertId: string;
  isLiked?: boolean;
}

export default function LikeDialog({ open, onOpenChange, concertId, isLiked }: LikeDialogProps) {
  // 링크 이동
  const router = useRouter();
  const handleLikeConcert = async () => {
    if (!concertId) return;

    if (isLiked) {
      toast.error("이미 알림 설정된 공연입니다.");
      return;
    }

    await postLikeConcert(concertId);
    toast.success("알림이 설정되었습니다.");
    router.refresh();
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange} aria-description="알림 설정하기">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>알림을 설정하시겠어요?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          이 공연을 찜하고, 예매 오픈 일정에 맞춰 안내 이메일을 받아보세요.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleLikeConcert}>설정</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
