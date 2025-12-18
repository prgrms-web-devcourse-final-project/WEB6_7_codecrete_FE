"use client";

import ChooseConcertModal from "@/components/concert-mate/modal/ChooseConcertModal";
import ConcertSelectSection from "@/components/review/write/ConcertSelectSection";
import { useState } from "react";

export default function ModalContainer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClick = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      <ConcertSelectSection onClick={onClick} />
      {isModalOpen && <ChooseConcertModal onClose={onClick} />}
    </>
  );
}
