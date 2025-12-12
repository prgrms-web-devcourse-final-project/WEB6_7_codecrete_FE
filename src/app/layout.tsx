import "@/css/globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

import { pretendard } from "@/../public/fonts/local_fonts";

import { twMerge } from "tailwind-merge";

export const metadata = {
  title: "내콘부",
  description: "티켓",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={twMerge("min-h-dvh text-sm", pretendard.className)}>
        <Header />
        <main className="min-h-dvh">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
