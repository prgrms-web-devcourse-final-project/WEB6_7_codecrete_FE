/**
 * 현재 사용자의 위경도 좌표를 가져옵니다.
 *
 * @returns {Promise<{ lat: number; lon: number }>} 위도와 경도 객체
 */
export const getCurrentCoordinate = (): Promise<{ lat: number; lon: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => reject(err),
      { enableHighAccuracy: true }
    );
  });
};

/**
 * 두 좌표 간의 거리를 미터 단위로 계산합니다.
 * @param {number} lat1 첫 번째 좌표의 위도
 * @param {number} lon1 첫 번째 좌표의 경도
 * @param {number} lat2 두 번째 좌표의 위도
 * @param {number} lon2 두 번째 좌표의 경도
 * @returns {number} 두 좌표 간의 거리 (미터 단위)
 */
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371e3; // 지구 반지름 (미터 단위)
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);
  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // 거리 반환 (미터 단위)
};
