// 날짜 비교 유틸 함수
export const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
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
