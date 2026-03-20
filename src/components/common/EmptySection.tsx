import { ComputerIcon, GhostIcon, LucideFileWarning } from "lucide-react";
import Link from "next/link";

interface EmptySectionProps {
  title: string;
  message: string;
  type: "shutdown" | "error" | "empty";
}

export default function EmptySection({ title, message, type }: EmptySectionProps) {
  return (
    <div className="bg-muted/20 border-accent flex flex-col items-center justify-center gap-6 rounded-lg border p-10 lg:p-15">
      <div className="bg-muted flex size-20 items-center justify-center rounded-full shadow-xs ring-4 ring-white">
        {type === "shutdown" && <ComputerIcon className="stroke-muted-foreground size-10" />}
        {type === "error" && <LucideFileWarning className="stroke-muted-foreground size-10" />}
        {type === "empty" && <GhostIcon className="stroke-muted-foreground size-10" />}
      </div>
      <div className="space-y-1 text-center">
        <h3 className="text-center text-base font-bold md:text-lg lg:text-xl">{title}</h3>
        <p className="text-accent-foreground text-center text-xs font-medium md:text-sm lg:text-base">
          {message}
        </p>
      </div>
      {type === "error" && (
        <p className="text-muted-foreground text-center text-sm">
          문제가 지속되면{" "}
          <Link
            href="mailto:garlatonic@kakao.com"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            관리자
          </Link>
          에게 문의해주세요.
        </p>
      )}
      {type === "shutdown" && (
        <p className="text-muted-foreground text-center text-sm">
          운영 시간: 매일 오전 9시 ~ 오후 6시
        </p>
      )}
    </div>
  );
}
