"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
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
import { toast } from "sonner";
import { joinChatRoom } from "@/lib/api/chat/chat.client";
import { useRouter } from "next/navigation";
import { MessageSquareIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function ConcertChatButton({ concertId }: { concertId?: string }) {
  const router = useRouter();
  const [chatDialogOpen, setChatDialogOpen] = useState(false);

  const handleOpenChatModal = () => {
    setChatDialogOpen(true);
  };

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
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="border-border hover:bg-border group"
            onClick={handleOpenChatModal}
          >
            <MessageSquareIcon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <span>채팅 참여하기</span>
        </TooltipContent>
      </Tooltip>
      {/* 채팅 참여하기 클릭 시 모달 */}
      <AlertDialog
        open={chatDialogOpen}
        onOpenChange={setChatDialogOpen}
        aria-description="채팅 참여하기"
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>채팅에 참여하시겠어요?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            예매일이 임박한 공연이에요.
            <br />
            채팅에 참여해 실시간 서버 시간과 다른 이용자들과의 이야기를 함께 나눠보세요.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleJoinChat(concertId)}>참여</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
