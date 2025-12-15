"use client";

import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/auth/PasswordInput";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SignInFormValues, signInSchema } from "@/lib/validations/auth";
import FieldError from "@/components/auth/FieldError";

export default function SignInForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (data: SignInFormValues) => {
    try {
      await login(data.email, data.password);
      toast.success("로그인이 완료됐습니다.");
      router.push("/home");
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
        <Input
          placeholder="이메일을 입력하세요"
          className="bg-point-sub h-13"
          autoComplete={"email"}
          aria-label={"이메일"}
          {...register("email")}
        />
        {errors.email && <FieldError message={errors.email.message} />}
      </div>
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <div className={"flex flex-col gap-2"}>
            <PasswordInput
              value={field.value}
              onChange={field.onChange}
              placeholder={"비밀번호를 입력하세요"}
              autoComplete="current-password"
            />
            {errors.password && <FieldError message={errors.password?.message} />}
          </div>
        )}
      />

      {/*TODO: 아이디 저장 및 비밀번호 찾기는 시간 되면 나중에 구현*/}
      {/*<div className="idSave flex justify-between">*/}
      {/*  <div className="flex items-center gap-2">*/}
      {/*    <Checkbox className="cursor-pointer" />*/}
      {/*    <Label>아이디 저장</Label>*/}
      {/*  </div>*/}
      {/*  /!* TODO: 비밀번호 찾기 *!/*/}
      {/*  /!* <Link href="/sign-up" className="text-text-sub cursor-pointer hover:text-text-main">*/}
      {/*          비밀번호를 잊으셨나요?*/}
      {/*        </Link> *!/*/}
      {/*</div>*/}

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
