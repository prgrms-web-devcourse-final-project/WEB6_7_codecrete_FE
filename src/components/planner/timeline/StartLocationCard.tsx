"use client";
import { useState } from "react";
import { Plus, Navigation, MapPinIcon, MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserPlace } from "@/types/planner";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStartLocation } from "@/hooks/planner/useStartLocation";
import StartLocationDialog from "../dialogs/StartLocationDialog";

export default function StartLocationCard({
  userLocation,
}: {
  userLocation: UserPlace | undefined | null;
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const { location, loading, handlePlaceSelect, handleCurrentLocation, handleDeleteLocation } =
    useStartLocation({ initialLocation: userLocation });

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
          <div className="space-y-6">
            <div className="space-y-1 lg:space-y-2">
              <h4 className="text-base font-bold lg:text-lg">콘서트 가는 날, 어디서 출발하세요?</h4>
              <p className="text-text-sub text-xs leading-normal lg:text-sm">
                출발지를 설정하고 최고의 하루를 위한 외출 플래너를 시작해보세요!
              </p>
            </div>
            <Button size="sm" onClick={() => setOpenDialog(true)}>
              출발지 등록
            </Button>
          </div>
        )}
      </div>

      {/* 출발지 설정 다이얼로그 */}
      <StartLocationDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        location={location}
        loading={loading}
        handlePlaceSelect={handlePlaceSelect}
        handleCurrentLocation={handleCurrentLocation}
      />
    </article>
  );
}
