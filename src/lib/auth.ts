import { LoginResponse, SignUpResponse } from "@/types/auth";

// 로그인
export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    // fetch (네트워크 단계)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login`, {
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

// 회원가입
export async function signUp(payload: {
  email: string;
  nickname: string;
  password: string;
  birth: string;
  profileImage?: string;
}): Promise<SignUpResponse> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let json: SignUpResponse;
    try {
      json = (await res.json()) as SignUpResponse;
    } catch {
      throw new Error("서버 응답을 처리할 수 없습니다.");
    }

    if (!res.ok || json.resultCode !== "OK") {
      let fallbackMsg = "회원가입 중 오류가 발생했습니다.";

      if (res.status === 400) {
        fallbackMsg = "요청 값이 올바르지 않습니다.";
      } else if (res.status === 409) {
        fallbackMsg = "이미 가입된 사용자입니다.";
      } else if (res.status === 404) {
        fallbackMsg = "회원가입 API를 찾을 수 없습니다.";
      } else if (res.status >= 500) {
        fallbackMsg = "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      }

      throw new Error(json.msg ?? fallbackMsg);
    }

    return json;
  } catch (err) {
    if (err instanceof TypeError) {
      throw new Error("서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.");
    }

    if (err instanceof Error) {
      throw err;
    }

    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}

// 닉네임 중복 체크

export async function checkNickname(nickname: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/nickname/check?nickname=${encodeURIComponent(nickname)}`
    );

    const json = await res.json();

    if (!res.ok || json.resultCode !== "OK") {
      throw new Error(json.msg ?? "닉네임 확인 실패");
    }

    return json.data;
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

// 이메일 인증코드 전송

export async function sendEmailCode(email: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/email/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    let json;
    try {
      json = await res.json();
    } catch {
      throw new Error("서버 응답을 처리할 수 없습니다.");
    }

    if (!res.ok || json.resultCode !== "OK") {
      throw new Error(json.msg ?? "인증번호 전송 실패");
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

// 이메일 인증코드 검증

export async function verifyEmailCode(params: { email: string; code: string }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/email/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  let json;
  try {
    json = await res.json();
  } catch {
    throw new Error("서버 응답을 처리할 수 없습니다.");
  }

  if (!res.ok || json.resultCode !== "OK") {
    throw new Error(json.msg ?? "이메일 인증에 실패했습니다.");
  }

  return json;
}
