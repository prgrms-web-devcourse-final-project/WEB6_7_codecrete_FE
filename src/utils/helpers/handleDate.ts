// 날짜 비교 유틸 함수
export const isSameDay = (date1: Date, date2: Date) => {
  // 한국 시간(KST)으로 오늘 날짜 가져오기
  const todayKST = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" }));

  // date1과 date2가 같은 날인지 확인
  const isSameDate =
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

  // date1이 오늘인지 확인
  const isToday =
    date1.getFullYear() === todayKST.getFullYear() &&
    date1.getMonth() === todayKST.getMonth() &&
    date1.getDate() === todayKST.getDate();

  // 같은 날이고 오늘이면 true
  return isSameDate && isToday;
};

// 로컬 Date를 ISO 8601 문자열로 변환 (타임존 무시)
export const dateToISOString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
};

// 날짜 문자열을 로컬 날짜 객체로 변환 (타임존 무시)
export const getConcertStartDate = (dateString: string): Date => {
  try {
    const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
    const match = dateString.match(dateRegex);

    if (!match) {
      throw new Error("유효하지 않은 날짜 형식입니다.");
    }

    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1; // 0-based
    const day = parseInt(match[3], 10);

    return new Date(year, month, day, 0, 0, 0, 0);
  } catch (error) {
    console.error("날짜 파싱 오류:", error);
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }
};

// 날짜가 범위 내인지 확인 (자정 기준)
export const isDateInRange = ({
  d,
  startDate,
  endDate,
}: {
  d: Date;
  startDate: Date;
  endDate: Date;
}) => {
  const checkDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

  return checkDate >= start && checkDate <= end;
};
