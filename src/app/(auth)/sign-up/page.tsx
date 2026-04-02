import SocialButton from "@/components/auth/SocialButton";
import SignUpForm from "@/components/auth/sign-up/SignUpForm";
import Link from "next/link";

export const metadata = {
  title: "회원가입 | 내 콘서트를 부탁해",
  description:
    "내 콘서트를 부탁해에 가입하고 좋아하는 아티스트의 공연 소식을 가장 먼저 받아보세요!",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "회원가입 | 내 콘서트를 부탁해",
    description:
      "내 콘서트를 부탁해에 가입하고 좋아하는 아티스트의 공연 소식을 가장 먼저 받아보세요!",
    url: "/sign-up",
    siteName: "내 콘서트를 부탁해",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        height: 630,
        alt: "내 콘서트를 부탁해 - 회원가입",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "회원가입 | 내 콘서트를 부탁해",
    description:
      "내 콘서트를 부탁해에 가입하고 좋아하는 아티스트의 공연 소식을 가장 먼저 받아보세요!",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <div className="flex w-full max-w-150 flex-col justify-center gap-10 lg:max-w-150">
      <div className="intro flex flex-col gap-2 lg:gap-4">
        <h2 className="text-text-main text-2xl font-bold lg:text-4xl">회원가입</h2>
        <p className="text-text-sub text-sm lg:text-base">
          내콘부에 가입하고 좋아하는 아티스트의 공연 소식을 가장 먼저 받아보세요!
        </p>
      </div>

      <SocialButton />
      <SignUpForm />

      <div className="signUpLink flex justify-center gap-1">
        <p className="text-text-sub">이미 계정이 있으신가요?</p>
        <Link href="/sign-in" className="text-text-main hover:text-text-sub">
          로그인
        </Link>
      </div>
      <p className="agreePolicy text-text-sub flex justify-center text-center text-xs break-keep">
        계속 진행하시면 당사의 서비스 약관 및 개인정보 보호정책에 동의하는 것으로 간주됩니다.
      </p>
    </div>
  );
}
