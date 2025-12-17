import { Button } from "@/components/ui/button";

export default function ModalBtn() {
  return (
    <div className="flex justify-between gap-3 py-4">
      <Button type="reset" variant="outline" className="cursor-pointer">
        취소
      </Button>
      <Button type="submit" className="cursor-pointer">
        공연 선택
      </Button>
    </div>
  );
}
