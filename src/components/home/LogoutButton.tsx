"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth/auth.client";
import { toast } from "sonner";

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
    <button onClick={handleLogout} className="cursor-pointer hover:font-medium">
      로그아웃
    </button>
  );
}
