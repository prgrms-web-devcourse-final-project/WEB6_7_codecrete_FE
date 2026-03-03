"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { SignUpFormValues } from "@/lib/zod/auth";
import FieldError from "@/components/auth/FieldError";
import { useState } from "react";
import { checkNickname } from "@/lib/api/auth/auth.client";
import { NicknameFieldProps } from "@/types/auth";
import { toast } from "sonner";
import { Field, FieldLabel } from "@/components/ui/field";

export default function NicknameField({ checked, setChecked }: NicknameFieldProps) {
  const {
    register,
    getValues,
    // setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<SignUpFormValues>();

  const [checking, setChecking] = useState(false);

  const handleCheckNickname = async () => {
    const nickname = getValues("nickname");

    if (!nickname) {
      // setError("nickname", { type: "manual", message: "닉네임을 입력해주세요." });
      toast.error("닉네임을 입력해주세요.");
      return;
    }
    setChecking(true);
    try {
      await checkNickname(nickname);

      clearErrors("nickname");
      setChecked(true);
    } catch (e) {
      setChecked(false);

      // TODO: 나중에 setError로 처리하는 방법 찾기

      // setError("nickname", {
      //   type: "manual",
      //   message: e instanceof Error ? e.message : "닉네임을 사용할 수 없습니다.",
      // });
      toast.error(e instanceof Error ? e.message : "닉네임을 사용할 수 없습니다.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <Field className="nicknameInput">
      <FieldLabel htmlFor={"nickname"}>닉네임 *</FieldLabel>
      <div className="flex w-full items-center gap-2">
        <Input
          type="text"
          id={"nickname"}
          placeholder="닉네임을 입력하세요"
          className="bg-point-sub"
          {...register("nickname", {
            onChange: () => {
              setChecked(null);
            },
          })}
        />

        <Button
          type="button"
          variant="default"
          size="lg"
          className="bg-point-main"
          onClick={handleCheckNickname}
          disabled={checking}
        >
          {checking ? "확인중..." : "중복 확인"}
        </Button>
      </div>
      {checked === true && <p className="text-xs text-green-600">사용 가능한 닉네임입니다.</p>}
      {checked === false && <FieldError message="중복된 닉네임입니다." />}
      {errors.nickname && <FieldError message={errors.nickname.message} />}
    </Field>
  );
}
