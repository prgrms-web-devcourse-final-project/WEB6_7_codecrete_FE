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
import { ReviewDetailData, ReviewPostWrite } from "@/types/community/concert-review";
import { updateReviewPost } from "@/lib/api/community/concert-review/review.client";
import { toast } from "sonner";
import Image from "next/image";

export default function ReviewEditMain({
  concertId,
  postId,
  reviewDetail,
}: {
  concertId: number;
  postId: number;
  reviewDetail: ReviewDetailData;
}) {
  const methods = useForm<ReviewPostWrite>({
    defaultValues: {
      concertId: concertId,
      title: reviewDetail.post.title,
      rating: reviewDetail.rating,
      content: reviewDetail.post.content,
      activityTags: reviewDetail.tags,
    },
  });

  const router = useRouter();

  // 데이터가 서버로 날아가고 있는지 여부 (boolean)
  const {
    formState: { isSubmitting },
  } = methods;

  const MAX_IMAGE_COUNT = 5;
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [remainImageUrls, setRemainImageUrls] = useState<string[]>(reviewDetail.imageUrls);
  const [newImages, setNewImages] = useState<File[]>([]);
  const onCheckedChange = (isConfirmed: boolean) => {
    setIsConfirmed(isConfirmed);
  };

  const onRemoveExistingImage = (url: string) => {
    setRemainImageUrls((prev) => prev.filter((u) => u !== url));
  };

  const onSubmitReview = async (data: ReviewPostWrite) => {
    const finalData = { ...data, images: newImages, remainImageUrls };

    try {
      const isSuccess = await updateReviewPost(postId, finalData);

      if (isSuccess) {
        toast.success("리뷰글이 성공적으로 수정되었습니다!");
        router.push(`/concerts/${concertId}/review/${postId}`);
      } else {
        toast.error("수정에 실패했습니다. 입력 내용을 확인해주세요.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("서버와 통신 중 오류가 발생했습니다.");
      }
    }
  };

  const onChangeImages = (files: File[]) => {
    const totalCount = remainImageUrls.length + files.length;

    if (totalCount > MAX_IMAGE_COUNT) {
      toast.error(`사진은 최대 ${MAX_IMAGE_COUNT}장까지 업로드할 수 있습니다.`);
      return;
    }

    setNewImages(files);
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
            {remainImageUrls.length > 0 && (
              <div className="px-6">
                <div className="mb-3 text-sm font-medium">기존 사진</div>
                <div className="flex flex-wrap gap-3">
                  {remainImageUrls.map((url) => (
                    <div key={url} className="relative h-24 w-24 overflow-hidden rounded-md border">
                      <Image
                        src={url}
                        alt="기존 업로드 이미지"
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                      <button
                        type="button"
                        onClick={() => onRemoveExistingImage(url)}
                        className="absolute top-1 right-1 cursor-pointer rounded bg-white/80 px-2 py-1 text-xs"
                      >
                        삭제
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <PhotoUploadSection images={newImages} onChangeImages={onChangeImages} />
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
              buttonText={"리뷰 수정"}
            />
          </Card>
        </div>
      </section>
    </FormProvider>
  );
}
