import React from "react";

export default function InfoRow({
  icon,
  title,
  sub,
}: {
  icon: React.ReactNode;
  title: string;
  sub?: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="text-text-sub inline-flex items-center">{icon}</span>
      <div className="flex flex-col">
        <span className="font-medium">{title}</span>
        <span className="text-text-sub text-xs">{sub}</span>
      </div>
    </div>
  );
}
