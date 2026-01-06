"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ReviewWriteHeader from "@/components/review/write/ReviewWriteHeader";
import ReviewTitleSection from "@/components/review/write/ReviewTitleSection";
import ReviewRatingSection from "@/components/review/write/ReviewRatingSection";
import ReviewConcertSection from "@/components/review/write/ReviewConcertSection";
import PhotoUploadSection from "@/components/review/write/PhotoUploadSection";
import ReviewTagSection from "@/components/review/write/ReviewTagSection";
import ReviewConfirmSection from "@/components/review/write/ReviewConfirmSection";
import ReviewFooterActions from "@/components/review/write/ReviewFooterActions";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ReviewPostWrite } from "@/types/community/concert-review";
import { createReviewPost } from "@/lib/api/community/concert-review/review.client";
import { toast } from "sonner";

/**
 * 데이터를 다루기 위해 FormProvider 사용
 * MateWriteMain.tsx 파일 참고
 * 입력 데이터 및 타입 등 임시로 작성한 것이므로 오류가 있을 수 있음
 */

export default function ReviewWriteMain({ concertId }: { concertId: number }) {
  const methods = useForm<ReviewPostWrite>({
    defaultValues: {
      concertId: concertId,
      title: "",
      rating: 0,
      content: "",
      activityTags: [],
    },
  });

  const router = useRouter();

  // 데이터가 서버로 날아가고 있는지 여부 (boolean)
  const {
    formState: { isSubmitting },
  } = methods;

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const onCheckedChange = (isConfirmed: boolean) => {
    setIsConfirmed(isConfirmed);
  };

  // 등록 버튼
  const onSubmitReview = async (data: ReviewPostWrite) => {
    const finalData = { ...data, images };

    try {
      const isSuccess = await createReviewPost(finalData);

      if (isSuccess) {
        toast.success("리뷰글이 성공적으로 등록되었습니다!");
        router.push(`/concerts/${concertId}`);
      } else {
        toast.error("등록에 실패했습니다. 입력 내용을 확인해주세요.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("서버와 통신 중 오류가 발생했습니다.");
      }
    }
  };

  // 취소 버튼
  const onCancelReview = () => {
    router.push(`/concerts/${concertId}`);
  };

  return (
    <FormProvider {...methods}>
      <section className={"bg-bg-main flex justify-center px-15 py-16"}>
        <div className={"flex w-full max-w-400 flex-col gap-8"}>
          <Card className={"gap-8 p-12"}>
            <ReviewWriteHeader />
            <ReviewTitleSection />
            <ReviewRatingSection />
            <ReviewConcertSection />
            <PhotoUploadSection images={images} onChangeImages={setImages} />
            <div className="px-6">
              <Separator />
            </div>
            <ReviewTagSection />
            <div className="px-6">
              <Separator />
            </div>
            <ReviewConfirmSection checked={isConfirmed} onChange={onCheckedChange} />
            <ReviewFooterActions
              onSubmit={methods.handleSubmit(onSubmitReview)}
              onCancel={onCancelReview}
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
