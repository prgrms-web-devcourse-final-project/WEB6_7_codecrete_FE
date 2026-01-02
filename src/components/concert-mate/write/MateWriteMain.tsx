"use client";

import { Card } from "@/components/ui/card";
import MateWriteIntro from "@/components/concert-mate/write/MateWriteIntro";
import MateTitleSection from "@/components/concert-mate/write/MateTitleSection";
import MateWriteSection from "@/components/concert-mate/write/MateWriteSection";
import MateTimeSection from "@/components/concert-mate/write/MeetingTimeSection";
import MeetingPlaceSection from "@/components/concert-mate/write/MeetingPlaceSection";
import ActivityTagSection from "@/components/concert-mate/write/ActivityTagSection";
import { Separator } from "@/components/ui/separator";
import ReviewConfirmSection from "@/components/review/write/ReviewConfirmSection";
import ReviewFooterActions from "@/components/review/write/ReviewFooterActions";
import PreferenceSelectSection from "@/components/concert-mate/write/PreferenceSelectSection";
import { twMerge } from "tailwind-merge";
import SelectedConcert from "@/components/concert-mate/write/SelectedConcert";
import { FormProvider, useForm } from "react-hook-form";
import { MatePostWrite } from "@/types/community/concert-mate";

export default function MateWriteMain() {
  const methods = useForm<MatePostWrite>({
    defaultValues: {
      concertId: 0,
      title: "", //v
      content: "", //v
      maxParticipants: undefined, //v
      genderPreference: "", //v
      ageRangeMin: undefined, //v
      ageRangeMax: undefined, //v
      meetingAt: "", // "meetingAt": "2025-01-05T18:30:00",
      meetingPlace: "", //v
      activityTags: [],
    },
  });

  return (
    <FormProvider {...methods}>
      <section className="bg-bg-main flex justify-center px-15 py-16">
        <form className={twMerge(`relative mx-auto flex w-full max-w-400 flex-col gap-8`)}>
          <Card className="gap-8 p-12">
            <MateWriteIntro />
            {/* 콘서트 선택 또는 검색*/}
            {/* TODO : 컴포넌트화 (PlannerCreate.tsx)*/}
            <SelectedConcert />
            {/* <SelectedConcertCard /> */}
            {/* 정보 입력 */}
            <MateTitleSection />
            <PreferenceSelectSection />
            <MateWriteSection />
            <MateTimeSection />
            <MeetingPlaceSection />
            <Separator className="px-6" />
            {/* 활동 태그 선택 */}
            <ActivityTagSection />
            <Separator className="px-6" />
            {/* 약관 동의 및 등록 */}
            <ReviewConfirmSection />
            <ReviewFooterActions />
          </Card>
        </form>
      </section>
    </FormProvider>
  );
}
