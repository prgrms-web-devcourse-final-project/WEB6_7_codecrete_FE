const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Next.js fetch 옵션 타입
type NextFetchOptions = RequestInit & {
  cache?: "force-cache" | "no-store" | "no-cache" | "reload";
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

/**
 * 클라이언트 공통 API 호출 함수
 *
 * @param {string} path API 경로
 * @param {NextFetchOptions} init fetch 옵션
 * @returns {Promise<Response>} fetch 응답
 */
export default async function ClientApi(path: string, init?: NextFetchOptions) {
  // FormData가 아닐 때만 기본값으로 JSON 설정
  const isFormData = init?.body instanceof FormData;

  const headers: Record<string, string> = {
    ...((init?.headers as Record<string, string>) || {}),
  };

  if (!isFormData && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers,
    credentials: "include",
  });

  return res;
}
