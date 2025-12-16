"use client";

import { Button } from "@/components/ui/button";
import NicknameField from "@/components/auth/sign-up/NicknameField";
import EmailField from "@/components/auth/sign-up/EmailField";
import PasswordField from "@/components/auth/sign-up/PasswordField";
import BirthField from "@/components/auth/sign-up/BirthField";
import AgreeField from "@/components/auth/sign-up/AgreeField";
import { FormProvider, useForm } from "react-hook-form";
import { SignUpFormValues, signUpSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { signUp } from "@/lib/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const router = useRouter();

  const [isNicknameChecked, setIsNicknameChecked] = useState<boolean | null>(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const methods = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      nickname: "",
      email: "",
      emailCode: "",
      password: "",
      passwordConfirm: "",
      birth: "",
      agree: false,
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    shouldUnregister: false,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values: SignUpFormValues) => {
    if (isNicknameChecked !== true) {
      methods.setError("nickname", {
        type: "manual",
        message: "닉네임 중복 확인을 해주세요.",
      });
      return;
    }

    if (!isEmailVerified) {
      methods.setError("emailCode", {
        type: "manual",
        message: "이메일 인증을 완료해주세요.",
      });
      return;
    }

    try {
      await signUp(values);
      toast.success("로그인 페이지로 이동합니다.");
      router.push("/sign-in");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "회원가입에 실패했습니다.");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="input flex flex-col gap-6">
        <NicknameField checked={isNicknameChecked} setChecked={setIsNicknameChecked} />
        <EmailField onVerified={() => setIsEmailVerified(true)} />
        <PasswordField />
        <BirthField />
        <AgreeField />

        <Button
          type="submit"
          className="signUpButton cursor-pointer"
          variant="default"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "회원가입 중..." : "회원가입"}
        </Button>
      </form>
    </FormProvider>
  );
}
