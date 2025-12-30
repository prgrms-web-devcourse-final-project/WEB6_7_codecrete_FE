"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { SignUpFormValues } from "@/lib/zod/auth";
import { sendEmailCode, verifyEmailCode } from "@/lib/api/auth/auth.client";
import { toast } from "sonner";
import FieldError from "@/components/auth/FieldError";

type EmailFieldProps = {
  onVerified: () => void;
};

export default function EmailField({ onVerified }: EmailFieldProps) {
  const {
    register,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<SignUpFormValues>();

  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    if (remainingTime <= 0) return;

    const timer = setInterval(() => {
      setRemainingTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime]);

  const handleSendCode = async () => {
    const email = getValues("email")?.trim();

    if (!email) {
      // TODO: 닉네임 중복 확인 버튼 클릭 시 setError로 추가한 에러가
      // 즉시 FieldError로 렌더링되지 않고, submit 시점에만 노출됨
      // RHF formState / FieldError 렌더 조건 재확인 필요

      // setError("email", {
      //   type: "manual",
      //   message: "이메일을 입력해주세요",
      // });
      toast.error("이메일을 입력해주세요");
      return;
    }

    setIsSendingCode(true);

    try {
      await sendEmailCode(email);

      clearErrors("email");
      setIsCodeSent(true);
      setRemainingTime(300);

      toast.success("인증 코드 전송 완료", {
        description: "이메일로 인증 코드가 전송되었습니다.",
      });
    } catch (e) {
      setError("email", {
        type: "manual",
        message: e instanceof Error ? e.message : "인증 코드 전송 중 오류가 발생했습니다.",
      });
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleVerifyCode = async () => {
    const email = getValues("email")?.trim();
    const code = getValues("emailCode")?.trim();

    if (!code) {
      // TODO: 나중에 setError로 바꾸기
      // setError("emailCode", {
      //   type: "manual",
      //   message: "인증번호를 입력해주세요.",
      // });

      toast.error("인증번호를 입력해주세요");
      return;
    }

    try {
      setIsVerifying(true);
      await verifyEmailCode({ email, code });

      clearErrors("emailCode");
      setIsVerified(true);
      setRemainingTime(0);
      onVerified();

      toast.success("이메일 인증 완료", {
        description: "이메일 인증이 성공적으로 완료되었습니다.",
      });
    } catch (e) {
      setError("emailCode", {
        type: "manual",
        message: e instanceof Error ? e.message : "인증번호가 올바르지 않습니다.",
      });
    } finally {
      setIsVerifying(false);
    }
  };
  return (
    <>
      <div className="emailInput flex flex-col gap-2">
        <label htmlFor={"email"} className="text-sm">
          이메일 *
        </label>
        <div className="flex w-full items-center gap-2">
          <Input
            type="email"
            id={"email"}
            placeholder="이메일을 입력하세요"
            autoComplete={"username"}
            className="bg-point-sub h-13"
            disabled={isVerified || (isCodeSent && remainingTime > 0)}
            {...register("email")}
          />
          <Button
            type="button"
            onClick={handleSendCode}
            variant="default"
            size="lg"
            className="bg-point-main h-13"
            disabled={isVerified || isSendingCode || (isCodeSent && remainingTime > 0)}
          >
            {isVerified
              ? "인증 완료"
              : isCodeSent && remainingTime > 0
                ? `${String(Math.floor(remainingTime / 60)).padStart(2, "0")}:${String(
                    remainingTime % 60
                  ).padStart(2, "0")}`
                : "이메일 인증"}
          </Button>
        </div>
        {errors.email && <FieldError message={errors.email.message} />}
      </div>
      {isCodeSent && (
        <div className="emailConfirm flex flex-col gap-2">
          <label htmlFor={"emailCode"} className="text-sm">
            이메일 인증 *
          </label>
          <div className="flex w-full items-center gap-2">
            <Input
              type="text"
              id={"emailCode"}
              placeholder="인증번호를 입력해주세요"
              className="bg-point-sub h-13"
              disabled={isVerified}
              {...register("emailCode")}
            />
            <Button
              type="button"
              variant="default"
              size="lg"
              className="bg-point-main h-13"
              onClick={handleVerifyCode}
              disabled={isVerified || isVerifying}
            >
              {isVerified ? "인증 완료" : isVerifying ? "확인 중..." : "인증 확인"}
            </Button>
          </div>
          {errors.emailCode && <FieldError message={errors.emailCode.message} />}
        </div>
      )}
    </>
  );
}
