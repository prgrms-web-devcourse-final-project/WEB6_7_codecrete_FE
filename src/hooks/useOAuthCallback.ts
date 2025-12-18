"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function useOAuthCallback(provider: "google" | "kakao") {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  useEffect(() => {
    if (!code) return;

    const login = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login/${provider}?code=${code}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("OAuth login failed");
        }

        router.replace("/home");
        toast.success("로그인 성공!");
      } catch (error) {
        console.error(`[OAuth ${provider}] 로그인 실패`, error);
        router.replace("/sign-in");
      }
    };

    login();
  }, [code, provider, router]);
}
