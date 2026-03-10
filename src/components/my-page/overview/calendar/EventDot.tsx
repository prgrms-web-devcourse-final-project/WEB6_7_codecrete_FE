import { cn } from "@/lib/utils";

interface EventDotProps {
  className?: string;
  size?: "sm" | "md"; // sm: mobile(size-1), md: desktop(size-2)
}

/**
 * 캘린더 이벤트 점 표시
 * @param className - 점 색상/테두리
 * @param size - 점 크기 (sm: 모바일, md: 데스크톱)
 */
export const EventDot = ({ className, size = "md" }: EventDotProps) => (
  <span
    className={cn("rounded-full", size === "sm" ? "size-1.5" : "size-2", className)}
    aria-hidden="true"
  />
);
