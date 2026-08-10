"use client";

import { ThemeProvider } from "next-themes";

export const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const scriptProps =
    typeof window === "undefined" ? undefined : ({ type: "application/json" } as const);

  return (
    <ThemeProvider
      scriptProps={scriptProps}
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
};
