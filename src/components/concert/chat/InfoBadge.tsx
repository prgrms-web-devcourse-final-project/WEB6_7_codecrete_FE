import React from "react";

export default function InfoBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-bg-sub inline-flex h-9 items-center gap-2 rounded-lg px-3">{children}</div>
  );
}
