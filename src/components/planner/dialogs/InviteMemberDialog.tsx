"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CheckIcon, CopyIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { PlannerMembers } from "../PlannerMembers"; // 경로 확인 필요

interface InviteMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function InviteMemberDialog({ open, onOpenChange }: InviteMemberDialogProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("https://example.com/invite-link");
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
          <DialogTitle>친구 초대</DialogTitle>
        </DialogHeader>
        <FieldGroup className="max-h-[60vh] gap-5 overflow-y-auto p-4">
          <Field>
            <FieldLabel>링크 공유하기</FieldLabel>
            <div className="flex gap-2">
              <Input
                readOnly
                value="https://example.com/invite-link"
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
          </Field>
          <Separator />
          <Field>
            <FieldLabel>이메일/닉네임 초대</FieldLabel>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input type="email" placeholder="이메일이나 닉네임 입력" />
              <Button type="submit" className="w-full sm:w-auto">
                초대
              </Button>
            </div>
          </Field>
          <Separator />
          <PlannerMembers />
        </FieldGroup>
      </DialogContent>
    </Dialog>
  );
}
