"use client";

import MapApi from "@/components/common/MapApi";
import { getConcertVenueInfo } from "@/lib/api/concerts/concerts.client";
import { ConcertVenueInfo } from "@/types/concerts";
import { AccessibilityIcon, LinkIcon, MapIcon, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import ConcertDetailVenueSkeleton from "./ConcertDetailVenueSkeleton";
import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import { Skeleton } from "@/components/ui/skeleton";

interface ConcertDetailVenueProps {
  concertId: string;
}

interface VenueState {
  status: "loading" | "empty" | "loaded";
  data: ConcertVenueInfo | null;
}

export default function ConcertDetailVenue({ concertId }: ConcertDetailVenueProps) {
  const [venueState, setVenueState] = useState<VenueState>({
    status: "loading",
    data: null,
  });

  const { ref, visible } = useIntersectionOnce<HTMLDivElement>({
    rootMargin: "200px 0px",
  });

  // console.log(ref);

  useEffect(() => {
    let cancelled = false;

    const fetchConcertVenue = async () => {
      try {
        const res = await getConcertVenueInfo({ concertId });
        const data = res.data as ConcertVenueInfo | null;

        if (cancelled) return;

        if (!data) {
          setVenueState({ status: "empty", data: null });
        } else {
          setVenueState({ status: "loaded", data });
        }
      } catch {
        if (!cancelled) {
          setVenueState({ status: "empty", data: null });
        }
      }
    };

    fetchConcertVenue();

    return () => {
      cancelled = true;
    };
  }, [concertId]);

  const { status, data: concertVenue } = venueState;

  // 1) 로딩 중: 전체 섹션 스켈레톤
  if (status === "loading") {
    return <ConcertDetailVenueSkeleton />;
  }

  // 2) 데이터 없음
  if (status === "empty" || !concertVenue) {
    return (
      <div className="space-y-6 px-5 lg:px-0">
        <h2 className="text-text-main text-xl font-bold lg:text-2xl">공연장 정보</h2>
        <p className="bg-bg-sub text-text-main rounded-xl p-6 font-medium">
          해당 공연장에 등록된 정보가 없습니다.
        </p>
      </div>
    );
  }

  // 3) 데이터 있음
  const placeUrl = concertVenue.placeUrl?.trim() ?? "";
  const placeTelephone = concertVenue.telephone?.trim() ?? "";

  const barrierFreeFacilities = [
    concertVenue.hasBarrierFreeElevator && "엘리베이터",
    concertVenue.hasBarrierFreeParking && "주차 구역",
    concertVenue.hasBarrierFreeRestRoom && "화장실",
    concertVenue.hasBarrierFreeRamp && "경사로",
  ].filter(Boolean);

  const nearbyAmenities = [
    concertVenue.hasCafe && "카페",
    concertVenue.hasNursingRoom && "수유실",
    concertVenue.hasPlayroom && "놀이방",
    concertVenue.hasRestaurant && "레스토랑",
    concertVenue.hasStore && "편의점",
  ].filter(Boolean);

  return (
    <div className="space-y-4 px-5 lg:space-y-6 lg:px-0">
      <h2 className="text-text-main text-xl font-bold lg:text-2xl">공연장 정보</h2>
      <div className="bg-bg-sub flex flex-col gap-4 rounded-xl p-4 lg:gap-6 lg:p-6">
        <div className="flex flex-col gap-2 lg:gap-3">
          <h3 className="text-text-main text-base font-semibold lg:text-lg">
            {placeUrl ? (
              <Link
                href={placeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                {concertVenue.placeName}
                <LinkIcon className="size-3.5 lg:size-4" />
              </Link>
            ) : (
              concertVenue.placeName
            )}
          </h3>

          <div className="text-text-sub grid grid-cols-1 gap-1 text-xs leading-normal font-medium md:grid-cols-2 lg:gap-2 lg:text-sm">
            <div className={twMerge("flex items-center gap-2", !placeTelephone && "col-span-2")}>
              <MapPin className="size-3.5 lg:size-4" />
              <p>{concertVenue.placeAddress}</p>
            </div>

            {placeTelephone && (
              <div className="flex items-center gap-2">
                <Phone className="size-3.5 lg:size-4" />
                <Link href={`tel:${placeTelephone}`}>{placeTelephone}</Link>
              </div>
            )}

            {barrierFreeFacilities.length > 0 && (
              <div className="text-text-sub flex items-center gap-2 font-medium">
                <AccessibilityIcon className="size-3.5 lg:size-4" />
                <p>{barrierFreeFacilities.join(" · ")}</p>
              </div>
            )}

            {nearbyAmenities.length > 0 && (
              <div className="text-text-sub flex items-center gap-2 font-medium">
                <MapIcon className="size-3.5 lg:size-4" />
                <p>{nearbyAmenities.join(" · ")}</p>
              </div>
            )}
          </div>
        </div>

        <div ref={ref}>
          {visible ? (
            <MapApi
              coords={{ lat: concertVenue.lat, lon: concertVenue.lon }}
              placeName={concertVenue.placeName}
            />
          ) : (
            <div className="border-accent rounded-xl border">
              <Skeleton className="h-[360px] w-full rounded-xl" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
