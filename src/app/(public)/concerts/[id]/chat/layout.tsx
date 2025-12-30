import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-bg-main fixed top-0 right-0 bottom-0 left-0 z-50">
      <div className="border-border mx-auto w-full max-w-400 lg:border-x">{children}</div>
    </div>
  );
}
