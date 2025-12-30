"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CheckIcon, CopyIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface LinkShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LinkShareDialog({ open, onOpenChange }: LinkShareDialogProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("https://example.com/share-link");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95%] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>링크 공유</DialogTitle>
        </DialogHeader>
        <FieldGroup className="max-h-[60vh] gap-5 overflow-y-auto p-4">
          <Field>
            <FieldLabel>링크 공유하기</FieldLabel>
            <div className="flex gap-2">
              <Input
                readOnly
                value="https://example.com/share-link"
                className="read-only:bg-muted"
              />
              <Button className="relative shrink-0" onClick={handleCopy} disabled={copied}>
                <span
                  className={twMerge(
                    "transition-all",
                    copied ? "scale-100 opacity-100" : "absolute scale-0 opacity-0"
                  )}
                >
                  <CheckIcon className="stroke-green-600" />
                </span>
                <span
                  className={twMerge(
                    "flex items-center gap-1 transition-all",
                    copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
                  )}
                >
                  <CopyIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">복사</span>
                </span>
              </Button>
            </div>
            <p className="text-muted-foreground text-xs">
              공유 링크를 복사하여 친구들에게 일정을 공유하세요.
            </p>
          </Field>
        </FieldGroup>
      </DialogContent>
    </Dialog>
  );
}
