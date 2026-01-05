"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon, Link2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export default function SharePosts() {
  const [copied, setCopied] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const shareInputRef = useRef<HTMLInputElement>(null);

  const handleOpenShareModal = () => {
    setShareDialogOpen(true);
  };

  const handleCopy = async () => {
    if (!shareInputRef.current) return;
    const text = shareInputRef.current.value;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("링크가 복사되었습니다.");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("복사에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Card className={"flex flex-col gap-4 p-6"}>
      <CardTitle>이 게시글 공유하기</CardTitle>

      <div className={"flex flex-col"}>
        <Button
          variant={"outline"}
          size={"lg"}
          className={"flex-1 py-2"}
          onClick={handleOpenShareModal}
        >
          <Link2 /> 링크 복사
        </Button>
      </div>

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
                  value={typeof window !== "undefined" ? window.location.href : ""}
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
    </Card>
  );
}
