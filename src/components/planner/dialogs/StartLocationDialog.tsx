"use client";
import { MapPin, Loader2, MapPinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SearchPlaces from "../sidebar/SearchPlaces";
import { Separator } from "@/components/ui/separator";
import { Dispatch, SetStateAction } from "react";
import { SearchPlace, UserPlace } from "@/types/planner";

const tabTriggerClass =
  "data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:text-primary-foreground dark:data-[state=active]:border-transparent h-auto py-2";

interface StartLocationDialogProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  location: UserPlace | undefined | null;
  loading: boolean;
  handlePlaceSelect: (place: SearchPlace) => Promise<void>;
  handleCurrentLocation: () => Promise<void>;
}

export default function StartLocationDialog({
  open,
  onOpenChange,
  location,
  loading,
  handlePlaceSelect,
  handleCurrentLocation,
}: StartLocationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} aria-description="출발지 설정 모달">
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
            <SearchPlaces placeholder="예: 강남역, 우리집" onSelect={handlePlaceSelect} />
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
  );
}
