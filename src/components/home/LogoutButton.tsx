"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/lib/api/auth/auth.client";
import { toast } from "sonner";
import { LogOutIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/home");
      router.refresh();
      toast.success("로그아웃 되었습니다.");
    } catch {
      toast.error("로그아웃에 실패했습니다.");
    }
  };
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={handleLogout}
          className={twMerge(
            "hover:bg-muted rounded-sm p-2 hover:font-medium",
            "lg:p-0 lg:hover:bg-transparent"
          )}
        >
          <span className="hidden lg:inline">로그아웃</span>
          <LogOutIcon className="size-4 lg:hidden" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="lg:hidden">
        <p>로그아웃</p>
      </TooltipContent>
    </Tooltip>
  );
}
