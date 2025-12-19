"use client";

import { useOAuthCallback } from "@/hooks/useOAuthCallback";

export default function KakaoCallbackClient() {
  useOAuthCallback("kakao");
  return null;
}
