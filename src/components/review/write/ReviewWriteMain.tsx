"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ReviewWriteHeader from "@/components/review/write/ReviewWriteHeader";
import SelectedConcertCard from "@/components/review/write/SelectedConcertCard";
import ReviewTitleSection from "@/components/review/write/ReviewTitleSection";
import ReviewRatingSection from "@/components/review/write/ReviewRatingSection";
import ReviewConcertSection from "@/components/review/write/ReviewConcertSection";
import SeatInfoSection from "@/components/review/write/SeatInfoSection";
import PhotoUploadSection from "@/components/review/write/PhotoUploadSection";
import ReviewTagSection from "@/components/review/write/ReviewTagSection";
import ReviewConfirmSection from "@/components/review/write/ReviewConfirmSection";
import ReviewFooterActions from "@/components/review/write/ReviewFooterActions";
import ModalContainer from "@/components/concert-mate/modal/ModalContainer";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

/**
 * 데이터를 다루기 위해 FormProvider 사용
 * MateWriteMain.tsx 파일 참고
 * 입력 데이터 및 타입 등 임시로 작성한 것이므로 오류가 있을 수 있음
 */

type ReviewPostWrite = {
  concertId: number;
  title: string;
  content: string;
  rating: number;
  images: string;
};

export default function ReviewWriteMain() {
  const methods = useForm<ReviewPostWrite>({
    defaultValues: {
      concertId: 0,
      title: "",
      content: "",
      rating: undefined,
      images: "",
    },
  });

  // 데이터가 서버로 날아가고 있는지 여부 (boolean)
  const {
    formState: { isSubmitting },
  } = methods;

  const [isConfirmed, setIsConfirmed] = useState(false);
  const onCheckedChange = (isConfirmed: boolean) => {
    setIsConfirmed(isConfirmed);
  };

  // 등록 버튼
  const onSubmitMate = () => {};

  // 취소 버튼
  const onCancelMate = () => {};

  return (
    <FormProvider {...methods}>
      <section className={"bg-bg-main flex justify-center px-15 py-16"}>
        <div className={"flex w-full max-w-400 flex-col gap-8"}>
          <Card className={"gap-8 p-12"}>
            <ReviewWriteHeader />
            {/* 공연 선택칸 + 선택 모달 */}
            <ModalContainer />
            <SelectedConcertCard />
            <ReviewTitleSection />
            <ReviewRatingSection />
            <ReviewConcertSection />
            <SeatInfoSection />
            <PhotoUploadSection />
            <div className="px-6">
              <Separator />
            </div>
            <ReviewTagSection />
            <div className="px-6">
              <Separator />
            </div>
            <ReviewConfirmSection checked={isConfirmed} onChange={onCheckedChange} />
            <ReviewFooterActions
              onSubmit={methods.handleSubmit(onSubmitMate)}
              onCancel={onCancelMate}
              isPending={isSubmitting}
              isDisabled={!isConfirmed}
              buttonText={"리뷰 등록"}
            />
          </Card>
        </div>
      </section>
    </FormProvider>
  );
}
