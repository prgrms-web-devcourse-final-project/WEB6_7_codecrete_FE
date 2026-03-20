import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Field, FieldGroup } from "../ui/field";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { DialogDescription } from "@radix-ui/react-dialog";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  shareUrl: string;
}

export default function ShareDialog({ open, onOpenChange, shareUrl }: ShareDialogProps) {
  // 링크 공유하기 Input
  const shareInputRef = useRef<HTMLInputElement>(null);

  // 공유하기 복사 상태 관리
  const [copied, setCopied] = useState<boolean>(false);

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
    <Dialog open={open} onOpenChange={onOpenChange} aria-description="공연 정보 공유하기">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>공유하기</DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          복사 버튼을 눌러 링크를 클립보드에 복사할 수 있습니다.
        </DialogDescription>
        <FieldGroup className="max-h-[60vh] gap-5 overflow-y-auto p-4">
          <Field>
            <div className="flex gap-2">
              <Input ref={shareInputRef} readOnly value={shareUrl} className="read-only:bg-muted" />
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
                  className={cn(
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
  );
}
