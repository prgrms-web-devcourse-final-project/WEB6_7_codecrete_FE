/**
 * 가격 포맷팅
 * 최소 가격과 최대 가격을 받아서 포맷팅된 문자열을 반환합니다.
 * 예: formatPrice(10000, 50000) => "₩ 10,000 - ₩ 50,000"
 *   formatPrice(30000, 30000) => "₩ 30,000"
 *
 * @param {number} min 최소 가격
 * @param {number} max 최대 가격
 * @returns {string} 포맷팅된 가격 문자열
 */
export const formatPrice = (min: number, max: number): string => {
  if (min === max) {
    return `₩ ${min.toLocaleString()}`;
  }
  return `₩ ${min.toLocaleString()} - ${max.toLocaleString()}`;
};

/**
 * 날짜 포맷팅
 * 시작 날짜와 종료 날짜를 받아서 포맷팅된 문자열을 반환합니다.
 * 예: formatDateRange("2025-12-24", "2025-12-26") => "2025.12.24 ~ 2025.12.26"
 *    formatDateRange("2025-12-24", "2025-12-24") => "2025.12.24"
 *
 * @param {string} startDate 시작 날짜 문자열 (예: "2025-12-24")
 * @param {string} endDate 종료 날짜 문자열 (예: "2025-12-26")
 * @returns {string} 포맷팅된 날짜 범위 문자열
 */
export const formatDateRange = (startDate: string, endDate: string): string => {
  // 날짜가 같으면 하나만 표시
  if (startDate === endDate) {
    return startDate.replace(/-/g, ".");
  }
  // 다르면 범위로 표시
  const formattedStart = startDate.replace(/-/g, ".");
  const formattedEnd = endDate.replace(/-/g, ".");
  return `${formattedStart} ~ ${formattedEnd}`;
};

/**
 * 날짜를 한글 형식으로
 * 예: 2025년 12월 24일 수요일
 *
 * @param {string} dateString 날짜 문자열 (예: "2025-12-24")
 * @returns {string} 한글 형식의 날짜 문자열
 */
export const formatDateKorean = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
};

/**
 * 날짜 범위를 한글 형식으로 포맷팅
 * 예: formatDateRangeKorean("2025-12-24", "2025-12-26") => "2025년 12월 24일 ~ 2025년 12월 26일"
 *    formatDateRangeKorean("2025-12-24", "2025-12-24") => "2025년 12월 24일"
 *
 * @param {string} startDate 시작 날짜 문자열 (예: "2025-12-24")
 * @param {string} endDate 종료 날짜 문자열 (예: "2025-12-26")
 * @returns {string} 한글 형식의 날짜 범위 문자열
 */
export const formatDateRangeKorean = (startDate: string, endDate: string): string => {
  if (startDate === endDate) {
    return formatDateKorean(startDate);
  }
  return `${formatDateKorean(startDate)} ~ ${formatDateKorean(endDate)}`;
};
