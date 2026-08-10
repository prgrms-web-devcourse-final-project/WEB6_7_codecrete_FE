import localFont from "next/font/local";

export const pretendard = localFont({
  src: "../fonts/local/PretendardVariable.woff2",
  display: "swap",
  preload: false,
  fallback: ["system-ui", "Apple SD Gothic Neo", "Malgun Gothic", "sans-serif"],
  weight: "400 500 600 700 900",
  variable: "--font-pretendard",
});
