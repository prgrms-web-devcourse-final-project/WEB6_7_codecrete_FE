// http:// or https:// 가 없는 도메인을 절대 URL 로 변환하는 유틸 함수
export const getShareBaseUrl = (domain: string) => {
  if (domain.startsWith("http://") || domain.startsWith("https://")) {
    return domain;
  }
  let protocol = "https:";
  if (typeof window !== "undefined" && window.location && window.location.protocol) {
    protocol = window.location.protocol;
  }
  return `${protocol}//${domain}`;
};
