import {
  deleteUserLocation,
  getAddressFromCoordsKakao,
  saveUserLocation,
  updateUserLocation,
} from "@/lib/api/planner/location.client";
import { SearchPlace, UserPlace } from "@/types/planner";
import { getCurrentCoordinate } from "@/utils/helpers/geolocation";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export function useStartLocation({
  initialLocation,
}: {
  initialLocation: UserPlace | undefined | null;
}) {
  const router = useRouter();

  const [location, setLocation] = useState<UserPlace | undefined | null>(initialLocation);
  const [loading, setLoading] = useState(false);

  const upsertLocation = useCallback(
    async (lat: number, lon: number, extra?: { address?: string; placeName?: string }) => {
      setLoading(true);

      try {
        // 현재 위치가 설정되어 있을 경우
        if (location) {
          await updateUserLocation({ lat, lon });
        } else {
          await saveUserLocation({ lat, lon });
        }

        setLocation({
          lat,
          lon,
          address: extra?.address ?? location?.address ?? "",
          placeName: extra?.placeName ?? location?.placeName,
        });
      } catch (error) {
        console.error(error);
        toast.error("출발지 정보를 저장하는데 실패했습니다.");
        throw error;
      } finally {
        router.refresh();
        setLoading(false);
      }
    },
    [location, router]
  );

  const handlePlaceSelect = useCallback(
    async (place: SearchPlace) => {
      const lat = place.y;
      const lon = place.x;
      await upsertLocation(lat, lon, {
        address: place.address_name,
        placeName: place.place_name,
      });
    },
    [upsertLocation]
  );

  const handleCurrentLocation = useCallback(async () => {
    setLoading(true);
    try {
      const { lat, lon } = await getCurrentCoordinate();
      const address = await getAddressFromCoordsKakao(lat, lon);
      await upsertLocation(lat, lon, { address });
    } finally {
      setLoading(false);
    }
  }, [upsertLocation]);

  const handleDeleteLocation = useCallback(async () => {
    try {
      await deleteUserLocation();
      setLocation(null);
      toast.success("출발지가 삭제되었습니다.");
    } catch (error) {
      console.error(error);
      toast.error("출발지 삭제에 실패했습니다.");
      throw error;
    } finally {
      router.refresh();
    }
  }, [router]);

  return {
    location,
    loading,
    handlePlaceSelect,
    handleCurrentLocation,
    handleDeleteLocation,
  };
}
