// 사용자 정보 조회

import { cookies } from "next/headers";
import { GetMeResponse } from "@/types/auth";

export async function getMe(): Promise<GetMeResponse> {
  // TODO: 보안 강화를 위한 쿠키 필터링 로직 개선
  // - 현재 모든 쿠키를 Cookie 헤더로 전달 중
  // - token / session 등 인증 관련 쿠키만 선별하여 전달하도록 수정 필요
  // - 불필요한 쿠키 노출을 방지하고, 향후 보안 이슈를 예방하기 위함
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/me`, {
      headers: { "Content-Type": "application/json", Cookie: cookieHeader },
      cache: "no-store",
    });

    let json;
    try {
      json = (await res.json()) as GetMeResponse;
    } catch {
      throw new Error("서버 응답을 처리할 수 없습니다.");
    }

    if (!res.ok || json.resultCode !== "OK") {
      const fallbackMessage =
        res.status === 401 || res.status === 403
          ? "인증이 필요합니다."
          : "사용자 정보를 가져올 수 없습니다.";
      throw new Error(json.msg ?? fallbackMessage);
    }

    return json;
  } catch (err) {
    if (err instanceof TypeError) {
      throw new Error("서버에 연결할 수 없습니다.");
    }
    if (err instanceof Error) {
      throw err;
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}

export async function getAuthStatus(): Promise<boolean> {
  try {
    await getMe();
    return true;
  } catch {
    return false;
  }
}
