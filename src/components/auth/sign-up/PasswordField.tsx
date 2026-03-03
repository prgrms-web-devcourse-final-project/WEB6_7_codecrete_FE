import PasswordInput from "@/components/auth/PasswordInput";
import { Controller, useFormContext } from "react-hook-form";
import { SignUpFormValues } from "@/lib/zod/auth";
import FieldError from "@/components/auth/FieldError";
import { Field, FieldLabel } from "@/components/ui/field";

export default function PasswordField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<SignUpFormValues>();

  return (
    <>
      <Field className="passwordInput">
        <FieldLabel htmlFor={"password"} className="text-sm">
          비밀번호 *
        </FieldLabel>
        <Controller
          name={"password"}
          control={control}
          render={({ field }) => (
            <PasswordInput
              value={field.value}
              id={"password"}
              onChange={field.onChange}
              placeholder={"영문, 숫자, 특수문자를 포함하여 8자 이상 입력하세요"}
              autoComplete="new-password"
            />
          )}
        />
        {errors.password && <FieldError message={errors.password.message} />}
      </Field>
      <Field className="passwordConfirm">
        <FieldLabel htmlFor={"passwordConfirm"}>비밀번호 확인 *</FieldLabel>
        <Controller
          name="passwordConfirm"
          control={control}
          render={({ field }) => (
            <PasswordInput
              value={field.value ?? ""}
              id={"passwordConfirm"}
              onChange={field.onChange}
              placeholder={"동일한 비밀번호를 입력하세요"}
              autoComplete="new-password"
            />
          )}
        />
        {errors.passwordConfirm && <FieldError message={errors.passwordConfirm.message} />}
      </Field>
    </>
  );
}
