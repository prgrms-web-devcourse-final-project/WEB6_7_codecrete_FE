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
import { joinChatRoom } from "@/lib/api/chat/chat.client";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

interface ChatDialogProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  concertId?: string;
}

export default function ChatDialog({ open, onOpenChange, concertId }: ChatDialogProps) {
  const router = useRouter();

  // 채팅방 입장 핸들러
  const handleJoinChat = async (concertId?: string) => {
    const id = Number(concertId);

    if (!concertId || Number.isNaN(id)) {
      toast.error("잘못된 공연 정보입니다.");
      return;
    }

    try {
      await joinChatRoom(id);
      toast.success("채팅방에 입장했습니다.");

      router.push(`/concerts/${id}/chat`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "채팅방 입장 실패");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange} aria-description="채팅 참여하기">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>채팅에 참여하시겠어요?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          채팅에 참여해 실시간 서버 시간과 다른 이용자들과의 이야기를 함께 나눠보세요.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleJoinChat(concertId)}>참여</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
