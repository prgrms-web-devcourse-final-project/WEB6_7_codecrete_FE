// TODO: 로그인 API base URL을 환경 변수(process.env)로 분리하기
import { LoginResponse } from "@/types/sign-in";

export async function login(email: string, password: string): Promise<LoginResponse> {
  // TODO: 요청 타임아웃 처리(AbortController) 추가 검토
  const res = await fetch("http://localhost:8080/api/v1/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const json = (await res.json()) as LoginResponse;
  // TODO: status 코드(401/404/5xx)별 에러 메시지 분기 필요 시 여기서 처리

  if (!res.ok || json.resultCode !== "OK") {
    // TODO: 서버 에러 메시지 포맷 변경 시 공통 에러 규격으로 매핑
    let fallbackMsg: string;
    if (res.status === 401) {
      fallbackMsg = "이메일 또는 비밀번호가 올바르지 않습니다.";
    } else if (res.status === 404) {
      fallbackMsg = "로그인 API를 찾을 수 없습니다.";
    } else if (res.status >= 500) {
      fallbackMsg = "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
    } else {
      fallbackMsg = "서버 응답 오류가 발생했습니다.";
    }
    throw new Error(json.msg ?? fallbackMsg);
  }

  return json;
}
// TODO: 로그아웃 API 추가 시 이 파일에 함께 관리
