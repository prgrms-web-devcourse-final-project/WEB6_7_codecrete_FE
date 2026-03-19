"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MessageSquareIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ChatDialog from "../../dialogs/ChatDialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ConcertChatButtonProps {
  concertId?: string;
  isAuthenticated?: boolean;
  isChatAvailable?: boolean;
}

export default function ConcertChatButton({
  concertId,
  isAuthenticated,
  isChatAvailable,
}: ConcertChatButtonProps) {
  const router = useRouter();
  const [chatDialogOpen, setChatDialogOpen] = useState(false);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="border-border hover:bg-border group"
            onClick={() => {
              if (!isAuthenticated) {
                toast.error("로그인이 필요합니다.");
                router.push("/sign-in");
                return;
              }
              if (!isChatAvailable) {
                toast.error("지금은 채팅 가능 기간이 아닙니다. 예매일을 확인해주세요.");
                return;
              }
              setChatDialogOpen(true);
            }}
          >
            <MessageSquareIcon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <span>채팅 참여하기</span>
        </TooltipContent>
      </Tooltip>

      {/* 채팅 참여하기 클릭 시 모달 */}
      <ChatDialog open={chatDialogOpen} onOpenChange={setChatDialogOpen} concertId={concertId} />
    </>
  );
}
