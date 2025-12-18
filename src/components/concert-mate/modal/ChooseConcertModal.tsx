import ModalContent from "@/components/concert-mate/modal/ModalContent";
import ModalHeader from "@/components/concert-mate/modal/ModalHeader";
import ModalBtn from "@/components/concert-mate/modal/ModalBtn";
import { twMerge } from "tailwind-merge";

type ChooseConcertModalProps = {
  onClose: () => void;
};

export default function ChooseConcertModal({ onClose }: ChooseConcertModalProps) {
  return (
    // 게시판 글작성 공연 선택 모달
    <div
      role="presentation"
      className="bg-opacity-50 fixed inset-0 z-50 flex h-full w-full cursor-default items-center justify-center backdrop-blur-sm"
      aria-label="모달 뒷 배경"
    >
      <section
        className={twMerge(
          `bg-bg-main max-auto max-h-[900px] w-full max-w-[540px] rounded-2xl px-6 shadow-sm`
        )}
      >
        <ModalHeader onClose={onClose} />
        <ModalContent />
        <ModalBtn />
      </section>
    </div>
  );
}
