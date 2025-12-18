"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const KAKAO_AUTH_URL =
  "https://kauth.kakao.com/oauth/authorize" +
  `?response_type=code` +
  `&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}` +
  `&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`;

const GOOGLE_AUTH_URL =
  "https://accounts.google.com/o/oauth2/v2/auth" +
  `?response_type=code` +
  `&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}` +
  `&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}` +
  `&scope=openid%20email%20profile`;

export default function SocialButton() {
  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  return (
    <>
      <div className="social bg-bg-main flex w-full flex-col gap-3">
        <Button
          className="kakao bg-point-main cursor-pointer"
          variant="default"
          size="lg"
          asChild={false}
          onClick={handleKakaoLogin}
        >
          <MessageCircle />
          Kakao로 계속하기
        </Button>

        <Button
          className="google bg-point-sub cursor-pointer"
          variant="outline"
          size="lg"
          asChild={false}
          onClick={handleGoogleLogin}
        >
          <Image src="/googleIcon.svg" alt="Google icon" width={15} height={15} />
          Google로 계속하기
        </Button>
      </div>

      <div className="separator flex items-center gap-3">
        <div className="border-border h-px w-full border-t"></div>
        <p className="text-text-sub">OR</p>
        <div className="border-border h-px w-full border-t"></div>
      </div>
    </>
  );
}
