"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScheduleDetail } from "@/types/planner";
import { formatDistance } from "@/utils/helpers/formatters";
import { calculateDistance } from "@/utils/helpers/geolocation";
import { Music4Icon, ScanIcon } from "lucide-react";
import Link from "next/link";
import { useMemo, useRef, useEffect } from "react";

// kakao maps SDK 전역 변수 선언하는거라 어쩔수없이 any 처리
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const kakao: any;

export default function PlannerMapView({ schedules }: { schedules: ScheduleDetail[] }) {
  const concertCoords = useMemo(() => {
    const concert = schedules.find(
      (s) =>
        (s.isMainEvent || s.concertId != null) && s.locationLat != null && s.locationLon != null
    );
    return concert ? { lat: concert.locationLat!, lon: concert.locationLon! } : null;
  }, [schedules]);

  const schedulesWithLocation = useMemo(
    () => schedules.filter((s) => s.location && s.locationLat != null && s.locationLon != null),
    [schedules]
  );

  const uniqueCoords = useMemo(() => {
    const coordMap = new Map<string, { lat: number; lon: number; isConcert: boolean }>();

    schedules.forEach((schedule) => {
      if (schedule.locationLat == null || schedule.locationLon == null) return;
      const key = `${schedule.locationLat},${schedule.locationLon}`;
      if (!coordMap.has(key)) {
        coordMap.set(key, {
          lat: schedule.locationLat,
          lon: schedule.locationLon,
          isConcert: schedule.isMainEvent || schedule.concertId != null,
        });
      }
    });

    return Array.from(coordMap.values());
  }, [schedules]);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const markersRef = useRef<kakao.maps.Marker[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current || typeof window === "undefined" || typeof kakao === "undefined")
      return;

    kakao.maps.load(() => {
      // 초기 맵 생성
      if (!mapRef.current) {
        const fallbackCenter = new kakao.maps.LatLng(37.5665, 126.978); // 서울 시청 근처
        mapRef.current = new kakao.maps.Map(mapContainerRef.current, {
          center:
            uniqueCoords[0] != null
              ? new kakao.maps.LatLng(uniqueCoords[0].lat, uniqueCoords[0].lon)
              : fallbackCenter,
          level: 5,
        });
      }

      const map = mapRef.current;
      if (!map) return;

      // 기존 마커 정리
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      if (uniqueCoords.length === 0) return;

      const makeMarkerImage = (label: string, isConcert: boolean) => {
        let svg, size, offset;

        if (isConcert) {
          // 콘서트: 핀 마커 모양 (빨간색)
          svg = `<svg width="30" height="40" viewBox="0 0 20 30" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow-pin">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#991b1b" flood-opacity="0.4" />
    </filter>
  </defs>
  <g filter="url(#shadow-pin)">
    <path d="M8.97229 29.3947C1.40469 17.0526 0 15.7859 0 11.25C0 5.03678 4.47714 0 10 0C15.5229 0 20 5.03678 20 11.25C20 15.7859 18.5953 17.0526 11.0277 29.3947C10.5311 30.2018 9.46885 30.2017 8.97229 29.3947Z" fill="#ef4444"/>
    <circle cx="10" cy="10" r="6" fill="white"/>
    <text x="10" y="11.5" text-anchor="middle" dominant-baseline="middle" fill="#ef4444" font-family="'Inter','Segoe UI',system-ui,sans-serif" font-size="7" font-weight="700">${label}</text>
  </g>
</svg>`;
          size = new kakao.maps.Size(30, 40);
          offset = new kakao.maps.Point(15, 40);
        } else {
          // 일반: 원형 마커
          svg = `<svg width="30" height="30" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow-circle">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000000" flood-opacity="0.18" />
    </filter>
  </defs>
  <circle cx="18" cy="18" r="15" fill="#e4e4f0" filter="url(#shadow-circle)"/>
  <circle cx="18" cy="18" r="13.5" fill="white" stroke="#d4d4e4" stroke-width="1"/>
  <text x="18" y="19.5" text-anchor="middle" dominant-baseline="middle" fill="#18181b" font-family="'Inter','Segoe UI',system-ui,sans-serif" font-size="14" font-weight="600">${label}</text>
</svg>`;
          size = new kakao.maps.Size(30, 30);
          offset = new kakao.maps.Point(15, 15);
        }

        const imageSrc = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
        return new kakao.maps.MarkerImage(imageSrc, size, { offset });
      };

      try {
        // 새 마커 추가 (번호 표시 + 클릭 시 확대)
        uniqueCoords.forEach(({ lat, lon, isConcert }, idx) => {
          const marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(lat, lon),
            image: makeMarkerImage(String(idx + 1), isConcert),
          });
          marker.setMap(map);
          markersRef.current.push(marker);
          kakao.maps.event.addListener(marker, "click", () => {
            map.setCenter(new kakao.maps.LatLng(lat, lon));
            map.setLevel(3, { animate: { duration: 300 } });
          });
        });
        // 좌표가 하나면 적당한 확대 레벨로 센터만 이동
        if (uniqueCoords.length === 1) {
          const { lat, lon } = uniqueCoords[0];
          map.setLevel(3);
          map.setCenter(new kakao.maps.LatLng(lat, lon));
          return;
        }
        // 여러 좌표가 모두 보이도록 bounds 적용
        const bounds = new kakao.maps.LatLngBounds();
        uniqueCoords.forEach(({ lat, lon }) => bounds.extend(new kakao.maps.LatLng(lat, lon)));
        map.setBounds(bounds, 40, 40, 40, 40);
      } catch (error) {
        // Kakao Maps SDK 초기화 중 오류가 발생한 경우 사용자에게 알리고 로그를 남깁니다.
        console.error("Failed to initialize Kakao map:", error);
        if (typeof window !== "undefined") {
          window.alert("지도를 불러오는 데 실패했어요. 페이지를 새로고침한 뒤 다시 시도해 주세요.");
        }
      }
    });
  }, [uniqueCoords]);

  const mapLink = useMemo(() => {
    const coordsUnion = uniqueCoords.map((c) => `${c.lat},${c.lon}`).join("/");
    return `https://www.google.com/maps/dir/${coordsUnion}`;
  }, [uniqueCoords]);

  return (
    <div className="bg-bg-main border-border border p-6">
      <h4 className="text-base font-bold">지도 보기</h4>
      <AspectRatio ratio={1 / 1}>
        <div className="border-border h-full w-full rounded-lg border bg-zinc-100">
          {uniqueCoords.length === 0 ? (
            <div className="text-text-sub flex h-full items-center justify-center text-sm">
              표시할 위치가 없습니다.
            </div>
          ) : (
            <div ref={mapContainerRef} className="h-full w-full rounded-lg" />
          )}
        </div>
      </AspectRatio>
      {schedulesWithLocation.length > 0 && (
        <ul className="space-y-3">
          {schedulesWithLocation.map((schedule, idx) => {
            const isConcert = schedule.isMainEvent || schedule.concertId != null;
            const distance =
              concertCoords &&
              schedule.locationLat != null &&
              schedule.locationLon != null &&
              !isConcert
                ? calculateDistance(
                    concertCoords.lat,
                    concertCoords.lon,
                    schedule.locationLat,
                    schedule.locationLon
                  )
                : null;

            const scheduleKey =
              schedule.id ??
              `${schedule.concertId ?? "no-concert-id"}-${schedule.location ?? "no-location"}-${
                schedule.locationLat ?? "no-lat"
              }-${schedule.locationLon ?? "no-lon"}`;

            return (
              <li key={scheduleKey} className="flex justify-between gap-2">
                <strong className="flex gap-2">
                  <Badge
                    variant={isConcert ? "destructive" : "outline"}
                    className="size-5 items-center p-0 leading-1"
                  >
                    {idx + 1}
                  </Badge>
                  <span className="text-text-main line-clamp-1">{schedule.location}</span>
                </strong>
                {isConcert ? (
                  <Music4Icon className="text-text-sub size-4" />
                ) : distance != null ? (
                  <span className="text-text-sub">{formatDistance(distance)}</span>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
      <Link href={mapLink} target="_blank" rel="noopener noreferrer" className="block">
        <Button className="w-full cursor-pointer">
          <ScanIcon />
          전체 지도 보기
        </Button>
      </Link>
    </div>
  );
}
