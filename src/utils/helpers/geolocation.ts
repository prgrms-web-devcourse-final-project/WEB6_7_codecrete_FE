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
