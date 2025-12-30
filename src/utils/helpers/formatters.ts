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

/**
 * 날짜 및 시간을 포맷팅
 * 예: formatDateTimeRange("2025-12-24T18:00", "2025-12-24T21:00") => "2025.12.24 18:00 ~ 21:00"
 *
 * @param {string} startDateTime 시작 날짜 및 시간 문자열 (예: "2025-12-24T18:00")
 * @param {string} endDateTime 종료 날짜 및 시간 문자열 (예: "2025-12-24T21:00")
 * @returns {string} 포맷팅된 날짜 및 시간 범위 문자열
 */
export const formatDateTimeRange = (startDateTime: string, endDateTime: string): string => {
  const start = new Date(startDateTime);
  const end = new Date(endDateTime);

  const formatDateTime = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  return `${formatDateTime(start)} ~ ${formatDateTime(end)}`;
};

/**
 * 콘서트 가격을 포맷팅
 * @param {number} minPrice - 최소 가격
 * @param {number} maxPrice - 최대 가격
 * @returns {string} 포맷팅된 가격 문자열
 */
export function formatConcertPrice(minPrice: number, maxPrice: number): string {
  // 둘 다 0원인 경우
  if (minPrice === 0 && maxPrice === 0) {
    return "무료";
  }

  // 최소와 최대가 같은 경우
  if (minPrice === maxPrice) {
    return `${minPrice.toLocaleString("ko-KR")}원`;
  }

  // 최소와 최대가 다른 경우
  return `${minPrice.toLocaleString("ko-KR")}원 ~ ${maxPrice.toLocaleString("ko-KR")}원`;
}
