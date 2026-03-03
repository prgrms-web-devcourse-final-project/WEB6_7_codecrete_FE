import SocialButton from "@/components/auth/SocialButton";
import SignInForm from "@/components/auth/sign-in/SignInForm";
import Link from "next/link";

export const metadata = {
  title: "로그인 | 내 콘서트를 부탁해",
  description: "로그인하고 나만의 공연 일정을 관리해보세요.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "로그인 | 내 콘서트를 부탁해",
    description: "로그인하고 나만의 공연 일정을 관리해보세요.",
    url: "/signup",
    siteName: "내 콘서트를 부탁해",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        height: 630,
        alt: "내 콘서트를 부탁해 - 로그인",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "로그인 | 내 콘서트를 부탁해",
    description: "로그인하고 나만의 공연 일정을 관리해보세요.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <div className="flex w-full max-w-150 flex-col justify-center gap-10 lg:max-w-150">
      <div className="intro flex flex-col gap-2 lg:gap-4">
        <h2 className="text-text-main text-2xl font-bold lg:text-4xl">환영합니다</h2>
        <p className="text-text-sub text-sm lg:text-base">
          로그인하고 나만의 공연 일정을 관리해보세요.
        </p>
      </div>
      {/* SNS 로그인 */}
      <SocialButton />
      {/* 일반 로그인 */}
      <SignInForm />
      <div className="space-y-2">
        <div className="signUpLink flex justify-center gap-1">
          <p className="text-text-sub">계정이 없으신가요?</p>
          <Link href="/sign-up" className="text-text-main hover:text-text-sub">
            로그인
          </Link>
        </div>
        <p className="agreePolicy text-text-sub flex justify-center text-center text-xs break-keep">
          계속 진행하시면 당사의 서비스 약관 및 개인정보 보호정책에 동의하는 것으로 간주됩니다.
        </p>
      </div>
    </div>
  );
}
