"use client";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import SearchPlaces from "../../sidebar/SearchPlaces";
import { SearchPlace, ConcertCoords } from "@/types/planner";
import { type ScheduleFormData } from "@/lib/zod/schedule.schema";

interface PlaceSelectorProps {
  form: UseFormReturn<ScheduleFormData>;
  scheduleType: "MEAL" | "WAITING" | "ACTIVITY" | "OTHER";
  defaultCoords?: ConcertCoords;
}

export function PlaceSelector({ form, scheduleType, defaultCoords }: PlaceSelectorProps) {
  const [isPlaceSelected, setIsPlaceSelected] = useState(false);
  const [placeName, setPlaceName] = useState("");
  const [placeAddress, setPlaceAddress] = useState("");

  const handlePlaceSelect = (place: SearchPlace) => {
    const newPlaceName = place.place_name || place.address_name;
    const newPlaceAddress = place.road_address_name || place.address_name || "";

    setPlaceName(newPlaceName);
    setPlaceAddress(newPlaceAddress);
    setIsPlaceSelected(true);

    form.setValue(
      "coords",
      { lat: Number(place.y), lon: Number(place.x) },
      { shouldValidate: true, shouldDirty: true, shouldTouch: true }
    );
    form.setValue("placeName", newPlaceName, { shouldValidate: true });
    form.setValue("placeAddress", newPlaceAddress, { shouldValidate: true });

    if (!form.getValues("title")) {
      form.setValue("title", newPlaceName, { shouldValidate: true });
    }
  };

  const handlePlaceReset = () => {
    setIsPlaceSelected(false);
    setPlaceName("");
    setPlaceAddress("");
    form.setValue("coords", null, { shouldValidate: true, shouldDirty: true });
    form.setValue("placeName", "", { shouldValidate: true });
    form.setValue("placeAddress", "", { shouldValidate: true });
  };

  return (
    <FormField
      control={form.control}
      name="coords"
      render={() => (
        <FormItem>
          <FormLabel>
            장소
            {(scheduleType === "MEAL" || scheduleType === "WAITING") && (
              <span className="text-red-500">*</span>
            )}
          </FormLabel>
          <FormControl>
            {isPlaceSelected ? (
              <div className="border-input dark:bg-input/30 flex items-center justify-between rounded-md border p-3">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold">{placeName}</span>
                    {placeAddress && <span className="text-xs text-gray-500">{placeAddress}</span>}
                  </div>
                </div>
                <Button size="sm" onClick={handlePlaceReset} className="h-8 text-xs" type="button">
                  다시 검색
                </Button>
              </div>
            ) : (
              <SearchPlaces
                placeholder="식당, 카페, 관광지 검색..."
                onSelect={handlePlaceSelect}
                scheduleType={scheduleType}
                defaultCoords={defaultCoords}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
