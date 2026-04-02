import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface IconLinkProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

export default function IconLink({ href, icon: Icon, label }: IconLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "hover:bg-muted rounded-sm p-2 hover:font-medium",
        "lg:p-0 lg:hover:bg-transparent"
      )}
    >
      <span className="hidden lg:inline">{label}</span>
      <Icon className="size-4 lg:hidden" />
    </Link>
  );
}
