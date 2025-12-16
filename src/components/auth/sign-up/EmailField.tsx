"use client";

// TODO: 나중에 input 값이 비어있을 때 이메일 인증 ui/ux 보완
// TODO: 이후 가능하면 setError로 에러처리 관리하기

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { SignUpFormValues } from "@/lib/validations/auth";
import { sendEmailCode, verifyEmailCode } from "@/lib/auth";
import { toast } from "sonner";
import FieldError from "@/components/auth/FieldError";

type EmailFieldProps = {
  onVerified: () => void;
};

export default function EmailField({ onVerified }: EmailFieldProps) {
  const {
    register,
    getValues,
    // setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<SignUpFormValues>();

  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [hasRequestedCode, setHasRequestedCode] = useState(false);
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
      // TODO: 나중에 에러 처리 setError로 바꾸기
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
      setHasRequestedCode(true);
      setRemainingTime(300);

      toast.success("인증 코드 전송 완료", {
        description: "이메일로 인증 코드가 전송되었습니다.",
      });
    } catch (e) {
      // setError("email", {
      //   type: "manual",
      //   message: e instanceof Error ? e.message : "인증 코드 전송 중 오류가 발생했습니다.",
      // });
      toast.error(e instanceof Error ? e.message : "인증 코드 전송 중 오류가 발생했습니다.");
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
      await verifyEmailCode({ email, code });

      clearErrors("emailCode");
      setIsVerified(true);
      setRemainingTime(0);
      onVerified();

      toast.success("이메일 인증 완료", {
        description: "이메일 인증이 성공적으로 완료되었습니다.",
      });
    } catch (e) {
      // setError("emailCode", {
      //   type: "manual",
      //   message: e instanceof Error ? e.message : "인증번호가 올바르지 않습니다.",
      // });
      toast.error(e instanceof Error ? e.message : "인증번호가 올바르지 않습니다.");
    }
  };
  return (
    <>
      <div className="emailInput flex flex-col gap-2">
        <p className="text-sm">이메일 *</p>
        <div className="flex w-full items-center gap-2">
          <Input
            type="email"
            placeholder="이메일을 입력하세요"
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
      {(hasRequestedCode || isCodeSent) && (
        <div className="emailConfirm flex flex-col gap-2">
          <p className="text-sm">이메일 인증 *</p>
          <div className="flex w-full items-center gap-2">
            <Input
              type="text"
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
              disabled={isVerified}
            >
              {isVerified ? "인증 완료" : "인증 확인"}
            </Button>
          </div>
          {errors.emailCode && <FieldError message={errors.emailCode.message} />}
        </div>
      )}
    </>
  );
}
