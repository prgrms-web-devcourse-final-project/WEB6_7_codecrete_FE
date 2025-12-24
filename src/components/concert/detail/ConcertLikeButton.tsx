"use client";

import { Button } from "@/components/ui/button";
import { deleteLikeConcert, postLikeConcert } from "@/lib/api/concerts";
import { HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export default function ConcertLikeButton({
  concertId,
  isLiked,
}: {
  concertId: string;
  isLiked?: boolean;
}) {
  const router = useRouter();

  // 알림 설정하기 핸들러 (찜하기)
  // TODO : 낙관적 업데이트 적용
  const handleLikeConcert = async () => {
    if (!concertId) return;
    if (isLiked) {
      await deleteLikeConcert(concertId);
      toast.success("알림이 해제되었습니다.");
    } else {
      await postLikeConcert(concertId);
      toast.success("알림이 설정되었습니다.");
    }
    router.refresh();
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
          isLiked && "fill-red-500 text-red-500"
        )}
      />
    </Button>
  );
}
