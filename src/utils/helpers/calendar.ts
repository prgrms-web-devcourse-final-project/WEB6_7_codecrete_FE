/**
 * Date → "YYYY-MM-DD" 변환 (로컬 기준)
 */
export const toYMD = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

/**
 * "YYYY-MM-DD" → Date 변환 (UTC 오프셋 방지)
 */
export const parseYMD = (s: string): Date => {
  const [y, m, d] = s.split("-").map(Number);
  const dt = new Date();
  dt.setFullYear(y, (m ?? 1) - 1, d ?? 1);
  dt.setHours(0, 0, 0, 0);
  return dt;
};
