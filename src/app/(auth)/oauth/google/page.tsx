"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function KakaoCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  useEffect(() => {
    if (!code) return;

    const login = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login/google?code=${code}`,
        {
          method: "GET",
          credentials: "include", // 쿠키 방식이면 필수
        }
      );

      if (res.ok) {
        router.replace("/home");
      } else {
        router.replace("/sign-in");
      }
    };

    login();
  }, [code, router]);

  return <p>구글 로그인 처리 중...</p>;
}
