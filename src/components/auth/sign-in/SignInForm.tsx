"use client";

import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/auth/PasswordInput";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/auth/auth.client";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SignInFormValues, signInSchema } from "@/lib/zod/auth";
import FieldError from "@/components/auth/FieldError";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";

const SAVED_EMAIL_KEY = "remember_email";

export default function SignInForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberEmail: false,
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem(SAVED_EMAIL_KEY);
    if (savedEmail) {
      setValue("email", savedEmail);
      setValue("rememberEmail", true);
    }
  }, [setValue]);

  const onSubmit = async (data: SignInFormValues) => {
    try {
      await login(data.email, data.password);

      if (data.rememberEmail) {
        localStorage.setItem(SAVED_EMAIL_KEY, data.email);
      } else {
        localStorage.removeItem(SAVED_EMAIL_KEY);
      }

      toast.success("로그인이 완료됐습니다.");
      router.push("/home");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("로그인 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="input flex flex-col gap-6">
      <div className={"flex flex-col gap-2"}>
        <label htmlFor="email" className={"text-sm"}>
          이메일
        </label>
        <Input
          id={"email"}
          placeholder="이메일을 입력하세요"
          className="bg-point-sub h-13"
          autoComplete={"email"}
          aria-label={"이메일"}
          {...register("email")}
        />
        {errors.email && <FieldError message={errors.email.message} />}
      </div>
      <div className={"flex flex-col gap-2"}>
        <label htmlFor="password">비밀번호</label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <div className={"flex flex-col gap-2"}>
              <PasswordInput
                id={"password"}
                value={field.value}
                onChange={field.onChange}
                placeholder={"비밀번호를 입력하세요"}
                autoComplete="current-password"
              />
              {errors.password && <FieldError message={errors.password?.message} />}
            </div>
          )}
        />
      </div>

      <div className="idSave flex justify-between">
        <div className="flex items-center gap-2">
          <Controller
            name="rememberEmail"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="rememberEmail"
                className="cursor-pointer"
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(Boolean(checked))}
              />
            )}
          />
          <Label htmlFor="rememberEmail">아이디 저장</Label>
        </div>
        {/* TODO: 비밀번호 찾기 */}
        {/* <Link href="/sign-up" className="text-text-sub cursor-pointer hover:text-text-main">
                비밀번호를 잊으셨나요?
              </Link> */}
      </div>

      <Button
        className="signInButton cursor-pointer"
        variant="default"
        type={"submit"}
        size="lg"
        asChild={false}
        disabled={isSubmitting}
      >
        {isSubmitting ? "로그인 중..." : "로그인"}
      </Button>
    </form>
  );
}
