"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function Logo() {
  const { resolvedTheme } = useTheme();

  if (!resolvedTheme) {
    return (
      <h1>
        <Link href="/home">
          <Image src="/logo_b.svg" alt="NCB Ticket" width={329} height={64} />
        </Link>
      </h1>
    );
  }

  return (
    <h1 className={twMerge(resolvedTheme === "dark" ? "brightness-0 invert" : "")}>
      <Link href="/home">
        <Image src="/logo_b.svg" alt="NCB Ticket" width={329} height={64} />
      </Link>
    </h1>
  );
}
