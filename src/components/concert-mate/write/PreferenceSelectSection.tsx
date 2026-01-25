"use client";

import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MatePostWrite } from "@/types/community/concert-mate";
import { Controller, useFormContext } from "react-hook-form";

export default function PreferenceSelectSection() {
  // TODO : message: "최소 1명 이상 모집해야 합니다." 이런 경고 메세지 안 뜸 문제
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<MatePostWrite>();

  return (
    <CardContent className="grid grid-cols-3 gap-2">
      <div className="flex flex-col gap-2">
        <Label htmlFor="participants">
          인원 수 <span className="text-text-sub">*</span>
        </Label>
        <Input
          id="participants"
          type="number"
          {...register("maxParticipants", {
            valueAsNumber: true,
            required: "인원수를 입력해주세요",
            min: {
              value: 2,
              message: "최소 2명 이상 모집해야 합니다.",
            },
            max: {
              value: 20,
              message: "최대 20명까지만 모집 가능합니다.",
            },
          })}
          placeholder="ex. 2"
          className="h-13"
        />
        {errors.maxParticipants && (
          <span className="text-destructive text-xs">{errors.maxParticipants.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="gender-preference">
          성별 <span className="text-text-sub">*</span>
        </Label>
        <Controller
          name="genderPreference"
          rules={{ required: "성별을 선택해주세요" }}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="gender-preference" className="!h-13 w-full">
                <SelectValue placeholder="ex. 성별 무관" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>성별</SelectLabel>
                  <SelectItem value="ANY">성별 무관</SelectItem>
                  <SelectItem value="MALE">남성</SelectItem>
                  <SelectItem value="FEMALE">여성</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.genderPreference && (
          <span className="text-destructive text-xs">{errors.genderPreference.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="age-range-min">연령대 (선택)</Label>
        <div className="flex gap-2">
          <Input
            id="age-range-min"
            type="number"
            {...register("ageRangeMin", {
              valueAsNumber: true,
              min: {
                value: 20,
                message: "만 19세 이상 성인만 모집 가능합니다.",
              },
              max: {
                value: 99,
                message: "입력 가능한 연령 범위가 아닙니다.",
              },
            })}
            placeholder="ex. 20 (~)"
            className="h-13"
          />
          <Input
            id="age-range-max"
            type="number"
            {...register("ageRangeMax", {
              valueAsNumber: true,
              // 최소값보다 작지 않은지 검증 로직
              validate: (val) => {
                const min = watch("ageRangeMin");
                return !val || !min || val >= min || "최소값보다 커야 합니다";
              },
              min: {
                value: 20,
                message: "만 19세 이상 성인만 모집 가능합니다.",
              },
              max: {
                value: 99,
                message: "입력 가능한 연령 범위가 아닙니다.",
              },
            })}
            placeholder="ex. 100"
            className="h-13"
          />
        </div>
        {errors.ageRangeMin && (
          <span className="text-destructive text-xs">{errors.ageRangeMin.message}</span>
        )}
        {errors.ageRangeMax && (
          <span className="text-destructive text-xs">{errors.ageRangeMax.message}</span>
        )}
      </div>
    </CardContent>
  );
}
