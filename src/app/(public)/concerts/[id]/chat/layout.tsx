import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={"border-border mx-auto min-h-screen max-w-400 border-x"}>{children}</div>;
}
