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

export default function SignUpForm() {
  const methods = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    // TODO: 필요하면 기본값(defaultValues) 추가 (예: agree: false)
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values: SignUpFormValues) => {
    alert(values);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="input flex flex-col gap-6">
        <NicknameField />
        <EmailField />
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
          회원가입
        </Button>
      </form>
    </FormProvider>
  );
}
