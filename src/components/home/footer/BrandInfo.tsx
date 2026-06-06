"use client";

import { Switch } from "@/components/ui/switch";
import { changeUsersSettings } from "@/lib/api/user/user.client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function BrandInfo({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = async (checked: boolean) => {
    const next = checked ? "dark" : "light";
    setTheme(next);

    if (isLoggedIn) {
      await changeUsersSettings({
        darkMode: next === "dark", // T/F 전환
      });
    }
  };

  return (
    <div className="lg:x-1/2 space-y-2 lg:space-y-4 xl:w-1/3">
      <div className="flex items-center justify-between">
        <h2 className="text-text-main text-xl font-black lg:text-2xl">CodeCrete</h2>
        <div className="text-text-sub flex items-center justify-between gap-1.5 lg:text-base">
          {theme === "dark" ? <Moon /> : <Sun />}
          <Switch
            aria-describedby="다크모드 스위치"
            checked={theme === "dark"}
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
