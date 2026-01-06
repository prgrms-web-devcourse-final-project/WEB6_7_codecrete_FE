"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { deleteLikeConcert, postLikeConcert } from "@/lib/api/concerts/concerts.client";
import { HeartIcon, Loader2Icon } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export default function ConcertLikeButton({
  concertId,
  isAuthenticated,
  isLiked,
}: {
  concertId: string;
  isAuthenticated: boolean;
  isLiked?: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [currentLiked, setCurrentLiked] = useState<boolean>(isLiked ?? false);

  // 알림 설정하기 핸들러 (찜하기)
  const handleLikeConcert = () => {
    if (!concertId) return;
    if (!isAuthenticated) {
      toast.error("로그인 후 이용해주세요.");
      return;
    }

    startTransition(async () => {
      if (currentLiked) {
        const ok = await deleteLikeConcert(concertId);
        if (!ok) {
          toast.error("알림 해제에 실패했습니다. 잠시 후 다시 시도해주세요.");
          return;
        }
        toast.success("알림이 해제되었습니다.");
        setCurrentLiked(false);
      } else {
        const ok = await postLikeConcert(concertId);
        if (!ok) {
          toast.error("알림 설정에 실패했습니다. 잠시 후 다시 시도해주세요.");
          return;
        }
        toast.success("알림이 설정되었습니다.");
        setCurrentLiked(true);
      }
    });
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border-border hover:bg-border group"
          onClick={handleLikeConcert}
        >
          {isPending ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <HeartIcon
              className={twMerge(
                "transition-all group-active:scale-110",
                currentLiked && "fill-red-500 text-red-500"
              )}
            />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top">
        <span>{currentLiked ? "알림 설정됨" : "알림 설정하기"}</span>
      </TooltipContent>
    </Tooltip>
  );
}
