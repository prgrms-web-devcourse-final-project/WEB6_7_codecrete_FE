"use client";
import MateTitleSection from "@/components/concert-mate/write/MateTitleSection";
import MateWriteSection from "@/components/concert-mate/write/MateWriteSection";
import MateTimeSection from "@/components/concert-mate/write/MeetingTimeSection";
import MeetingPlaceSection from "@/components/concert-mate/write/MeetingPlaceSection";
import ActivityTagSection from "@/components/concert-mate/write/ActivityTagSection";
import { Separator } from "@/components/ui/separator";
import ReviewConfirmSection from "@/components/review/write/ReviewConfirmSection";
import ReviewFooterActions from "@/components/review/write/ReviewFooterActions";
import PreferenceSelectSection from "@/components/concert-mate/write/PreferenceSelectSection";
import SelectedConcert from "@/components/concert-mate/write/SelectedConcert";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createMatePost } from "@/lib/api/community/concert-mate/mate.client";
import { MatePostWrite } from "@/types/community/concert-mate";
import { FieldGroup } from "@/components/ui/field";

export default function MateWriteMain() {
  const methods = useForm<MatePostWrite>({
    defaultValues: {
      concertId: 0,
      title: "",
      content: "",
      maxParticipants: undefined,
      genderPreference: "",
      ageRangeMin: undefined,
      ageRangeMax: undefined,
      meetingAt: "",
      meetingPlace: "",
      activityTags: [],
    },
  });
  const router = useRouter();

  // 데이터가 서버로 날아가고 있는지 여부 (boolean)
  const {
    formState: { isSubmitting },
  } = methods;

  const [isConfirmed, setIsConfirmed] = useState(false);
  const onCheckedChange = (isConfirmed: boolean) => {
    setIsConfirmed(isConfirmed);
  };

  // 등록 버튼
  const onSubmitMate = async (data: MatePostWrite) => {
    const finalData = {
      ...data,
    };

    try {
      const isSuccess = await createMatePost(finalData);

      if (isSuccess) {
        toast.success("구인글이 성공적으로 등록되었습니다!");
        router.push("/concert-mate");
        router.refresh();
      } else {
        toast.error("등록에 실패했습니다. 입력 내용을 확인해주세요.");
      }
    } catch (error) {
      console.error("제출 중 에러 발생:", error);

      toast.error("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  // 취소 버튼
  // TODO : 작성 중인 내용 확인하여 있으면 모달 추가로 막기
  const onCancelMate = () => {
    router.push(`/concert-mate`);
  };

  return (
    <FormProvider {...methods}>
      <section className="bg-bg-main space-y-5 px-5 py-6 lg:px-15 lg:py-16">
        <form className="border-border relative mx-auto flex w-full max-w-400 flex-col gap-5 rounded-lg border p-5 lg:gap-8 lg:p-20">
          <FieldGroup>
            {/* 콘서트 선택 또는 검색*/}
            {/* TODO : 컴포넌트화 (PlannerCreate.tsx)*/}
            <SelectedConcert />
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
            <ReviewConfirmSection checked={isConfirmed} onChange={onCheckedChange} />
            <ReviewFooterActions
              onSubmit={methods.handleSubmit(onSubmitMate)}
              onCancel={onCancelMate}
              isPending={isSubmitting}
              isDisabled={!isConfirmed}
              buttonText={"구인글 등록"}
            />
          </FieldGroup>
        </form>
      </section>
    </FormProvider>
  );
}
