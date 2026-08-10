import "@/css/globals.css";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";

import { pretendard } from "@/../public/fonts/local_fonts";

import { twMerge } from "tailwind-merge";
import { Toaster } from "@/components/ui/sonner";
import TopButton from "@/components/common/TopButton";
import Script from "next/script";
import React from "react";
import { QueryProvider } from "@/providers/QueryProvider";
import { CustomThemeProvider } from "@/components/CustomThemeProvider";

export const metadata = {
  title: "내콘부 | 내 콘서트를 부탁해",
  description: "공연 예매 일정 확인부터 동행 구하기까지, 내콘부와 함께하세요!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={twMerge("min-h-dvh text-sm", pretendard.className)}>
        <QueryProvider>
          <CustomThemeProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <Toaster className={pretendard.className} style={{ fontFamily: "inherit" }} />
            <TopButton />
          </CustomThemeProvider>
        </QueryProvider>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&libraries=services&autoload=false`}
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
