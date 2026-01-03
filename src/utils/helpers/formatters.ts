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

/**
 * 시간 문자열을 "오전 HH:MM" 형식으로 포맷팅
 * @param {string} timeStr - 시간 문자열 (예: "14:30:00")
 * @returns {string} 포맷팅된 시간 문자열 (예: "오후 02:30")
 */
export function formatTimeToKoreanAMPM(timeStr: string): string {
  const [hourStr, minuteStr] = timeStr.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);
  const period = hour < 12 ? "오전" : "오후";

  if (hour === 0) {
    hour = 12; // 오전 12시
  } else if (hour > 12) {
    hour -= 12; // 오후 시간 변환
  }
  const formattedHour = String(hour).padStart(2, "0");
  const formattedMinute = String(minute).padStart(2, "0");
  return `${period} ${formattedHour}:${formattedMinute}`;
}

/** HH:mm:ss 혹은 HH:mm을 받아 분 단위(HH:mm)로 자릅니다.
 * 빈 값이면 빈 문자열 반환.
 *
 * @param {string} time 시간 문자열
 * @returns {string} 분 단위 시간 문자열
 */
export const toMinutePrecision = (time?: string): string =>
  time?.split(":").slice(0, 2).join(":") || "";

/**
 * 거리 포맷팅
 * @param {number} distance - 거리 (미터 단위)
 * @returns {string} 포맷팅된 거리 문자열
 * - 1000m 미만: "xxx m"
 * - 1000m 이상: "x.x km"
 */
export const formatDistance = (distance: number): string => {
  if (distance < 1000) {
    return `${Math.round(distance)}m`;
  } else {
    return `${(distance / 1000).toFixed(1)}km`;
  }
};

/**
 * 가격 포맷팅
 * @param {number} price - 가격 (숫자)
 * @returns {string} 포맷팅된 가격 문자열 (예: "1,000원")
 */
export const formatPrice = (price: number): string => {
  return `${price.toLocaleString("ko-KR")}원`;
};
