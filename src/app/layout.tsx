import "@/css/globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

import { pretendard } from "@/../public/fonts/local_fonts";

import { twMerge } from "tailwind-merge";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "내콘부",
  description: "티켓",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={twMerge("min-h-dvh text-sm", pretendard.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="min-h-dvh">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
