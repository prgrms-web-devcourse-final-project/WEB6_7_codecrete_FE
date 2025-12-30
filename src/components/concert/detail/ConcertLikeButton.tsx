"use client";

import { Button } from "@/components/ui/button";
import { deleteLikeConcert, postLikeConcert } from "@/lib/api/concert.client";
import { HeartIcon } from "lucide-react";
import { useState } from "react";
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
  const [currentLiked, setCurrentLiked] = useState<boolean>(isLiked ?? false);

  // 알림 설정하기 핸들러 (찜하기)
  const handleLikeConcert = async () => {
    if (!concertId) return;
    if (!isAuthenticated) {
      toast.error("로그인 후 이용해주세요.");
      return;
    }

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
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="border-border hover:bg-border group"
      onClick={handleLikeConcert}
    >
      <HeartIcon
        className={twMerge(
          "transition-all group-active:scale-110",
          currentLiked && "fill-red-500 text-red-500"
        )}
      />
    </Button>
  );
}
