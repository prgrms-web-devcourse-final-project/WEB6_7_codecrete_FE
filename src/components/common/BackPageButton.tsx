"use client";

import { useRouter } from "next/navigation";
import { ButtonProps } from "@/types/planner";

export default function BackPageButton({ children, ...rest }: ButtonProps) {
  const router = useRouter();

  // 페이지 뒤로 가기 핸들러
  const handlePageBack = () => {
    router.back();
  };

  return (
    <button onClick={handlePageBack} {...rest}>
      {children}
    </button>
  );
}
