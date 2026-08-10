import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface WarningTimeDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function WarningTimeDialog({ open, onConfirm, onCancel }: WarningTimeDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onCancel}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>현재 선택한 시간은 추천 시간이 아닙니다.</AlertDialogTitle>
          <AlertDialogDescription>
            선택하신 시간은 이동 시간을 고려한 추천 시간이 아닙니다.
            <br />
            그래도 이 시간으로 일정을 등록하시겠습니까?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>취소</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>계속 진행</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
