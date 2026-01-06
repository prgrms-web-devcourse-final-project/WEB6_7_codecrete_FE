"use client";

import { useState } from "react";
import { MapPin, Plus, Navigation, Loader2, MapPinIcon, MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  deleteMyLocation,
  getAddressFromCoordsKakao,
  saveMyLocation,
  updateMyLocation,
} from "@/lib/api/planner/location.client";
import { getCurrentCoordinate } from "@/utils/helpers/geolocation";
import SearchPlaces from "../sidebar/SearchPlaces";
import { SearchPlace, UserPlace } from "@/types/planner";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

const tabTriggerClass =
  "data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:text-primary-foreground dark:data-[state=active]:border-transparent h-auto py-2";

export default function StartLocationCard({ myLocation }: { myLocation: UserPlace | null }) {
  const router = useRouter();

  const [location, setLocation] = useState<UserPlace | null>(myLocation);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const openSearchModal = () => setOpenDialog(true);

  // 현재 위치 불러와서 등록/수정
  const handleCurrentLocation = async () => {
    setLoading(true);
    try {
      const { lat, lon } = await getCurrentCoordinate();
      const address = await getAddressFromCoordsKakao(lat, lon);

      // location 상태가 있으면 수정(PATCH), 없으면 생성(POST)
      if (location) {
        await updateMyLocation({ lat, lon });
      } else {
        await saveMyLocation({ lat, lon });
      }

      setLocation({
        lat,
        lon,
        address,
      });

      setOpenDialog(false);
      toast.success(location ? "출발지가 수정되었습니다." : "출발지가 등록되었습니다.");
    } catch (error) {
      console.error(error);
      toast.error("위치 정보를 저장하는데 실패했습니다.");
    } finally {
      // 서버 컴포넌트 데이터 재요청
      router.refresh();
      setLoading(false);
    }
  };

  // 장소 검색결과로 등록/수정
  const handlePlaceSelect = async (place: SearchPlace) => {
    setLoading(true);
    try {
      const lat = place.y; // 좌표 변환
      const lon = place.x;

      // location 상태가 있으면 수정(PATCH), 없으면 생성(POST)
      if (location) {
        await updateMyLocation({ lat, lon });
      } else {
        await saveMyLocation({ lat, lon });
      }

      setLocation({
        lat,
        lon,
        address: place.address_name, // 검색 결과의 주소 사용
        placeName: place.place_name, // 검색 결과의 장소명 사용
      });

      setOpenDialog(false);
      toast.success(location ? "출발지가 수정되었습니다." : "출발지가 등록되었습니다.");
    } catch (error) {
      console.error(error);
      toast.error("장소 정보를 저장하는데 실패했습니다.");
    } finally {
      // 서버 컴포넌트 데이터 재요청
      router.refresh();
      setLoading(false);
    }
  };

  const handleDeleteLocation = async () => {
    try {
      // 빈 좌표로 업데이트하여 삭제 효과
      await deleteMyLocation();
      setLocation(null);
      toast.success("출발지가 삭제되었습니다.");
    } catch (error) {
      console.error(error);
      toast.error("출발지 삭제에 실패했습니다.");
    } finally {
      // 서버 컴포넌트 데이터 재요청
      router.refresh();
    }
  };

  return (
    <article className="relative flex gap-2 lg:gap-6">
      {/* 왼쪽 아이콘 */}
      <div className="z-10 flex-none">
        <div className="border-bg-main bg-bg-sub flex size-10 items-center justify-center rounded-full border-2 lg:size-16 lg:border-4">
          {location ? (
            <Navigation className="text-primary size-4 lg:size-6" />
          ) : (
            <Plus className="text-text-sub size-4 lg:size-6" />
          )}
        </div>
      </div>

      {/* 오른쪽 컨텐츠 카드 */}
      <div className="border-border bg-bg-sub text-text-main flex-1 space-y-3 rounded-xl border p-4 lg:space-y-4 lg:p-6">
        {location && (
          <>
            <div className="flex justify-between">
              <div className="space-y-1 lg:space-y-2">
                <h4 className="text-base font-bold lg:text-lg">완벽한 하루의 시작!</h4>
                <p className="text-text-sub text-xs leading-normal lg:text-sm">
                  경유지를 추가하면 자동으로 최적 경로가 생성됩니다.
                </p>
              </div>
              {/* 드롭다운 메뉴 */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" aria-label="메뉴 열기" className="size-8 p-0">
                    <MoreHorizontalIcon className="size-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => setOpenDialog(true)}>
                    출발지 변경
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={handleDeleteLocation}>출발지 삭제</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Separator />
            <div className="text-text-sub flex items-center gap-1">
              <MapPinIcon className="size-3 lg:size-4" />
              <p className="text-xs leading-normal lg:text-sm">
                {location.address}
                {location.placeName && `· ${location.placeName}`}
              </p>
            </div>
          </>
        )}
        {!location && (
          <div className="flex justify-between">
            <div className="space-y-1 lg:space-y-2">
              <h4 className="text-base font-bold lg:text-lg">콘서트 가는 날, 어디서 출발하세요?</h4>
              <p className="text-text-sub text-xs leading-normal lg:text-sm">
                출발지를 설정하고 최고의 하루를 위한 외출 플래너를 시작해보세요!
              </p>
            </div>
            <Button size="sm" onClick={openSearchModal}>
              출발지 등록
            </Button>
          </div>
        )}
      </div>

      {/* 출발지 설정 다이얼로그 */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog} aria-description="출발지 설정 모달">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>출발지 {location ? "변경" : "설정"}</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="current" className="gap-4 p-4">
            <TabsList className="bg-background h-auto w-full gap-1 border p-1">
              <TabsTrigger className={tabTriggerClass} value="current">
                현재 위치
              </TabsTrigger>
              <TabsTrigger className={tabTriggerClass} value="search">
                장소 검색
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="current"
              className="flex min-h-[40dvh] flex-1 flex-col items-center justify-center gap-6 py-10"
            >
              <div className="bg-bg-sub rounded-full p-5">
                <MapPin className="size-10" />
              </div>
              <div className="space-y-1 text-center">
                <p className="text-base font-medium lg:text-lg">
                  현재 계신 곳을 출발지로 설정할까요?
                </p>
                <p className="text-text-sub text-xs leading-normal lg:text-sm">
                  브라우저 위치 권한 허용이 필요합니다.
                </p>
              </div>
              <Button
                onClick={handleCurrentLocation}
                disabled={loading}
                className="w-full max-w-xs"
                size="lg"
              >
                {loading ? <Loader2 className="mr-2 animate-spin" /> : "현재 위치로 설정하기"}
              </Button>
            </TabsContent>

            {/* 탭 2 */}
            <TabsContent
              value="search"
              className="flex max-h-[40dvh] min-h-[40dvh] flex-1 flex-col gap-2 overflow-hidden"
            >
              <SearchPlaces
                placeholder="예: 강남역, 우리집"
                onSelect={handlePlaceSelect} // 여기만 잘 연결하면 끝!
              />
            </TabsContent>
          </Tabs>
          {location && (
            <>
              <Separator />
              <div className="text-text-sub flex items-center gap-1 p-4 text-sm">
                <MapPinIcon className="size-3.5" />
                <p className="text-text-main">
                  <span className="text-text-sub font-medium">현재 설정된 위치 : </span>
                  {location.address && location.placeName
                    ? `${location.address} · ${location.placeName}`
                    : location.address || location.placeName || "주소 정보 없음"}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </article>
  );
}
