"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

export default function MapApi({
  coords,
  placeName,
}: {
  coords: { lat: number; lon: number };
  placeName: string;
}) {
  const [coord, setCoord] = useState<{ lat: number; lon: number }>({ lat: 0, lon: 0 });

  useEffect(() => {
    setCoord(coords);
  }, [coords]);

  return (
    <Map
      center={{ lat: coord.lat, lng: coord.lon }}
      style={{ width: "100%", height: "360px", borderRadius: "16px", border: "1px solid #e5e7eb" }}
      level={3}
    >
      <MapMarker position={{ lat: coord.lat, lng: coord.lon }}>
        <div className="-mx-3 -my-3">
          <div className="relative w-70 rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm leading-snug text-gray-900">
            <div className="mb-1.5 flex items-center gap-1.5 font-semibold">
              <span className="truncate">{placeName}</span>
            </div>
            <div className="flex gap-2">
              <Link
                href={`https://map.kakao.com/link/map/${placeName},${coord.lat},${coord.lon}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 rounded-full bg-gray-100 px-2.5 py-1.5 text-center text-[11px] font-medium text-gray-600 hover:bg-gray-200"
              >
                지도 보기
              </Link>
              <Link
                href={`https://map.kakao.com/link/to/${placeName},${coord.lat},${coord.lon}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 rounded-full bg-linear-to-br from-indigo-600 to-pink-500 px-2.5 py-1.5 text-center text-[11px] font-semibold text-white hover:from-indigo-700 hover:to-pink-600"
              >
                길찾기
              </Link>
            </div>
          </div>
        </div>
      </MapMarker>
    </Map>
  );
}
