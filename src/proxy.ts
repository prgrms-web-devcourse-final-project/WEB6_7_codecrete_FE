import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const AUTH_REQUIRED_PATHS = ["/my-page", "/planner"];
const GUEST_ONLY_PATHS = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const accessToken = getCookie(request, "ACCESS_TOKEN");
  const refreshToken = getCookie(request, "REFRESH_TOKEN");

  const accept = request.headers.get("accept") ?? "";
  const isPageRequest = accept.includes("text/html");

  const accessState = accessToken ? verifyAccessToken(accessToken) : "expired";
  const needsRefresh = !!refreshToken && accessState === "expired";

  // 0) 게스트 전용 경로 처리 (/sign-in, /sign-up)
  if (isGuestOnlyPath(pathname)) {
    const res = await handleGuestOnlyRoute(request, accessToken, refreshToken);
    if (res) return res;
    return NextResponse.next();
  }

  // 1) 로그인된 사용자(refreshToken 보유)의 토큰 자동 갱신 처리 (경로 무관)
  if (needsRefresh) {
    if (isPageRequest) {
      return refreshAccessAndContinueOrLogout(request);
    } else {
      const newAccess = await requestNewAccessToken(request);
      if (newAccess) {
        const res = NextResponse.next();
        setAccessCookie(res, newAccess);
        return res;
      }

      return NextResponse.next();
    }
  }

  // 2) 인증 필요 없는 경로는 그대로 통과
  if (!isAuthRequiredPath(pathname)) {
    return NextResponse.next();
  }

  // 3) 인증 필수 경로인데 로그인 정보가 없으면 로그인으로 이동
  if (!accessToken && !refreshToken) {
    return redirectToLogin(request);
  }

  // accessToken이 명확히 invalid인 경우 로그인으로 이동
  if (accessState === "invalid") {
    return redirectToLogin(request);
  }

  return NextResponse.next();
}

/* -------------------------------------------------------------------------- */
/* Guest-only                                                                  */
/* -------------------------------------------------------------------------- */

async function handleGuestOnlyRoute(
  request: NextRequest,
  accessToken: string | null,
  refreshToken: string | null
): Promise<NextResponse | null> {
  // access가 유효하면 이미 로그인 상태 → 대시보드로 이동
  if (accessToken && verifyAccessToken(accessToken) === "valid") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // access가 없거나 만료/invalid인데 refresh가 있으면,
  // refresh가 "살아있으면" 새 access 받아서 로그인 상태로 보고 대시보드로 이동,
  // refresh가 "죽었으면" 쿠키 정리하고 /login 접근 허용
  if (refreshToken) {
    const newAccess = await requestNewAccessToken(request);

    if (newAccess) {
      const res = NextResponse.redirect(new URL("/home", request.url));
      setAccessCookie(res, newAccess);
      return res;
    }

    // refresh도 만료/invalid → 쿠키 삭제하고 /login 그대로 보여주기
    const res = NextResponse.next();
    clearAuthCookies(res);
    return res;
  }

  // 토큰 자체가 없으면 그냥 /login 접근 허용
  return null;
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

function isAuthRequiredPath(pathname: string) {
  const isStaticPath = AUTH_REQUIRED_PATHS.some((p) => pathname.startsWith(p));

  // 채팅은 로그인 필수
  const isChatPath = pathname.startsWith("/concerts/") && pathname.endsWith("/chat");

  // 리뷰 작성/수정은 로그인 필수
  const isReviewWriteOrEditPath =
    pathname.startsWith("/concerts/") &&
    pathname.includes("/review/") &&
    (pathname.endsWith("/write") || pathname.endsWith("/edit"));

  return isStaticPath || isChatPath || isReviewWriteOrEditPath;
}

function isGuestOnlyPath(pathname: string) {
  return GUEST_ONLY_PATHS.some((p) => pathname.startsWith(p));
}

function getCookie(request: NextRequest, name: string) {
  return request.cookies.get(name)?.value ?? null;
}

function redirectToLogin(request: NextRequest) {
  const res = NextResponse.redirect(new URL("/sign-in", request.url));
  clearAuthCookies(res);
  return res;
}

function clearAuthCookies(res: NextResponse) {
  res.cookies.set("ACCESS_TOKEN", "", { maxAge: 0, path: "/" });
  res.cookies.set("REFRESH_TOKEN", "", { maxAge: 0, path: "/" });
}

function setAccessCookie(res: NextResponse, token: string) {
  res.cookies.set("ACCESS_TOKEN", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    domain: process.env.NODE_ENV === "production" ? ".naeconcertbutakhae.shop" : undefined,
  });
}

function verifyAccessToken(token: string): "valid" | "expired" | "invalid" {
  try {
    const t = token.trim().replace(/^"|"$/g, "");

    const secret = Buffer.from(process.env.SECRET_KEY!, "base64url");

    jwt.verify(t, secret, { algorithms: ["HS512"] });
    return "valid";
  } catch (err) {
    if (err instanceof Error && err?.name === "TokenExpiredError") return "expired";
    return "invalid";
  }
}

async function refreshAccessAndContinueOrLogout(request: NextRequest) {
  const newAccessToken = await requestNewAccessToken(request);

  if (!newAccessToken) return redirectToLogin(request);

  const url = request.nextUrl.clone();
  const res = NextResponse.redirect(url);
  setAccessCookie(res, newAccessToken);
  return res;
}

async function requestNewAccessToken(request: NextRequest): Promise<string | null> {
  if (!API_URL) return null;

  try {
    const res = await fetch(`${API_URL}/api/v1/auth/refresh`, {
      method: "POST",
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.accessToken ?? data?.data?.accessToken ?? null;
  } catch {
    return null;
  }
}
