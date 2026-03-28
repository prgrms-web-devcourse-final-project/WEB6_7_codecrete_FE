"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CheckIcon, CopyIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { PlannerParticipantRole } from "@/types/planner";
import { useShareLink } from "@/hooks/useShareLink";

interface LinkShareDialogProps {
  planId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userRole: PlannerParticipantRole;
  domain: string;
}

export default function LinkShareDialog({
  planId,
  open,
  onOpenChange,
  userRole,
  domain,
}: LinkShareDialogProps) {
  const { shareLink, copied, handleCopyShareLink } = useShareLink(
    planId,
    domain,
    userRole === "OWNER" || userRole === "EDITOR"
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95%] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>링크 공유</DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          공유 링크를 복사하여 친구들에게 일정을 공유하세요.
        </DialogDescription>
        <FieldGroup className="max-h-[60vh] gap-5 overflow-y-auto p-4">
          <Field>
            <FieldLabel>링크 공유하기</FieldLabel>
            <div className="flex gap-2">
              <Input
                readOnly
                value={shareLink.url || shareLink.status}
                className="read-only:bg-muted"
              />
              <Button
                className="relative shrink-0"
                onClick={handleCopyShareLink}
                disabled={copied || !shareLink.url}
              >
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
              {shareLink.url
                ? "공유 링크를 복사하여 친구들에게 일정을 공유하세요."
                : "생성된 공유링크가 없어요. 관리자에게 문의해주세요."}
            </p>
          </Field>
        </FieldGroup>
      </DialogContent>
    </Dialog>
  );
}
