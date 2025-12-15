import { LoginResponse } from "@/types/sign-in";

export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    // fetch (네트워크 단계)
    const res = await fetch("http://localhost:8080/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    // JSON 파싱 단계 (여기서도 에러 날 수 있음)
    let json: LoginResponse;

    try {
      json = (await res.json()) as LoginResponse;
    } catch {
      // JSON 파싱 실패 (빈 응답, HTML 응답 등)
      throw new Error("서버 응답을 처리할 수 없습니다.");
    }

    // HTTP / 비즈니스 에러 분기
    if (!res.ok || json.resultCode !== "OK") {
      let fallbackMsg = "로그인 중 오류가 발생했습니다.";

      if (res.status === 401) {
        fallbackMsg = "이메일 또는 비밀번호가 올바르지 않습니다.";
      } else if (res.status === 404) {
        fallbackMsg = "로그인 API를 찾을 수 없습니다.";
      } else if (res.status >= 500) {
        fallbackMsg = "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      }

      throw new Error(json.msg ?? fallbackMsg);
    }

    // 성공
    return json;
  } catch (err) {
    // 네트워크 에러 (Failed to fetch)
    if (err instanceof TypeError) {
      throw new Error("서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.");
    }

    // 내가 던진 Error는 그대로 전달
    if (err instanceof Error) {
      throw err;
    }

    // 정말 예외적인 케이스
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}
