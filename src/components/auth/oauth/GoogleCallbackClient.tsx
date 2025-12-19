"use client";

import { useOAuthCallback } from "@/hooks/useOAuthCallback";

export default function GoogleCallbackClient() {
  useOAuthCallback("google");
  return null;
}
