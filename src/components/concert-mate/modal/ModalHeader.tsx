import { X } from "lucide-react";

type ModalHeaderProps = {
  onClose: () => void;
};

export default function ModalHeader({ onClose }: ModalHeaderProps) {
  return (
    <div className="flex justify-between py-4">
      <h2 className="text-xl font-bold">공연 선택하기</h2>
      <X className="text-text-sub cursor-pointer" onClick={onClose} />
    </div>
  );
}
