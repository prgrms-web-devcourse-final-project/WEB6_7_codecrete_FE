"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MateListBtnProps } from "@/types/community/concert-mate";
import { CheckIcon, CopyIcon, Heart, MessageCircle, Share2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export default function MateListBtn({ postId, likeCount, commentCount }: MateListBtnProps) {
  // TODO : 좋아요, 댓글 - 본인이 달았는지 여부 진한색으로 확인 기능

  // 공유 버튼
  // TODO : 공유 버튼 컴포넌트화 (QuickActionsSection.tsx)
  const [copied, setCopied] = useState<boolean>(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const shareInputRef = useRef<HTMLInputElement>(null);

  const handleOpenShareModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShareDialogOpen(true);
  };
  // 복사
  const handleCopy = async () => {
    if (!shareInputRef.current) return;

    const text = shareInputRef.current.value;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("링크가 복사되었습니다.");
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("Failed to copy text: ", e);
      toast.error("복사에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <div className="reaction flex gap-4 px-16">
        <button className="text-text-sub flex items-center gap-1 text-sm">
          <Heart className="h-4 w-4" />
          <p>{likeCount ?? "0"}</p>
        </button>
        <button className="text-text-sub flex items-center gap-1 text-sm">
          <MessageCircle className="h-4 w-4" />
          <p>{commentCount ?? 0}</p>
        </button>
        <button
          onClick={handleOpenShareModal}
          className="text-text-sub hover:text-accent-foreground flex cursor-pointer items-center gap-1 text-sm"
        >
          <Share2 className="h-4 w-4" />
          <p>공유하기</p>
        </button>
      </div>

      {/* 공유하기 모달 */}
      <Dialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        aria-description="공연 정보 공유하기"
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>공유하기</DialogTitle>
          </DialogHeader>
          <FieldGroup className="max-h-[60vh] gap-5 overflow-y-auto p-4">
            <Field>
              <div className="flex gap-2">
                <Input
                  ref={shareInputRef}
                  readOnly
                  value={`https://www.naeconcertbutakhae.shop/concert-mate/${postId}`}
                  className="read-only:bg-muted"
                />
                <Button
                  className="relative disabled:opacity-100"
                  onClick={handleCopy}
                  disabled={copied}
                >
                  <span
                    className={twMerge(
                      "transition-all",
                      copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    )}
                  >
                    <CheckIcon className="stroke-green-600 dark:stroke-green-400" />
                  </span>
                  <span
                    className={twMerge(
                      "absolute left-4 transition-all",
                      copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
                    )}
                  >
                    <CopyIcon />
                  </span>
                  {copied ? "복사됨" : "복사"}
                </Button>
              </div>
            </Field>
          </FieldGroup>
        </DialogContent>
      </Dialog>
    </>
  );
}
