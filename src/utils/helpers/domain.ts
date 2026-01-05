// http:// or https:// 가 없는 도메인을 절대 URL 로 변환하는 유틸 함수
export const getShareBaseUrl = (domain: string) => {
  if (domain.startsWith("http://") || domain.startsWith("https://")) {
    return domain;
  }

  // 프로덕션 환경에서는 항상 https 사용
  const isProduction = process.env.NODE_ENV === "production";
  if (isProduction) {
    return `https://${domain}`;
  }

  // 개발 환경에서는 현재 프로토콜 사용
  let protocol = "http:";
  if (typeof window !== "undefined" && window.location?.protocol) {
    protocol = window.location.protocol;
  }

  return `${protocol}//${domain}`;
};
