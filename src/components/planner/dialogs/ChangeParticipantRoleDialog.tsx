import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlannerParticipant, PlannerParticipantRole } from "@/types/planner";
import { Loader2Icon } from "lucide-react";

interface ChangeParticipantRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  participant: PlannerParticipant | null;
  nextRole: PlannerParticipantRole;
  onChangeRole: (role: PlannerParticipantRole) => void;
  onConfirm: () => void;
  isChangingRole: boolean;
}

export default function ChangeParticipantRoleDialog({
  open,
  onOpenChange,
  participant,
  nextRole,
  onChangeRole,
  onConfirm,
  isChangingRole,
}: ChangeParticipantRoleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>권한 변경</DialogTitle>
        </DialogHeader>
        <FieldGroup className="max-h-[60vh] gap-6 overflow-y-auto p-4">
          <Field>
            <Label className="text-text-sub text-sm">
              {participant ? `${participant.nickname}님의 역할을 선택하세요.` : ""}
            </Label>
            <Select
              value={nextRole || "VIEWER"}
              onValueChange={(value) => onChangeRole(value as PlannerParticipantRole)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="역할을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EDITOR">EDITOR (수정 가능)</SelectItem>
                <SelectItem value="VIEWER">VIEWER (읽기 전용)</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button onClick={onConfirm} disabled={isChangingRole}>
            {isChangingRole ? <Loader2Icon className="animate-spin" /> : "변경하기"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
