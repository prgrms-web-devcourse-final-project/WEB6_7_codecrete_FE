"use client";

import { Switch } from "@/components/ui/switch";
import { useIsMounted } from "@/hooks/useIsMounted";
import { changeUsersSettings } from "@/lib/api/user/user.client";
import { HttpError } from "@/types/my-page";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function BrandInfo({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const router = useRouter();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = currentTheme === "dark";

  const handleToggleTheme = async (checked: boolean) => {
    const next = checked ? "dark" : "light";
    setTheme(next);

    if (isLoggedIn) {
      try {
        const res = await changeUsersSettings({ darkMode: next === "dark" });

        if (!res) {
          toast.error("설정을 저장하지 못했습니다.");
          return;
        }
      } catch (error: unknown) {
        const err = error as HttpError;
        const status = err?.status;

        if (status === 401 || status === 403) {
          toast.error("로그인이 만료되었습니다. 다시 로그인해 주세요.");
          router.push("/sign-in");
        } else {
          toast.error("설정을 저장하지 못했습니다.");
        }
      }
    }
  };

  return (
    <div className="lg:x-1/2 space-y-2 lg:space-y-4 xl:w-1/3">
      <div className="flex items-center justify-between">
        <h2 className="text-text-main text-xl font-black lg:text-2xl">CodeCrete</h2>
        <div className="text-text-sub flex items-center justify-between gap-1.5 lg:text-base">
          {isDark ? <Moon /> : <Sun />}
          <Switch
            aria-describedby="다크모드 스위치"
            checked={isDark}
            onCheckedChange={handleToggleTheme}
          />
        </div>
      </div>
      <div className="text-text-sub lg:text-base">
        <p>
          Powered by
          <Link
            href="https://www.kopis.or.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-2 ml-1 hover:underline"
          >
            KOPIS
          </Link>
          &copy; Arts Management Support Center
        </p>
        <p>Website &copy; 2025 Team CodeCrete. All rights reserved.</p>
        <p>
          UI/UX Design by <strong>@garlatonic</strong>
        </p>
      </div>
    </div>
  );
}
