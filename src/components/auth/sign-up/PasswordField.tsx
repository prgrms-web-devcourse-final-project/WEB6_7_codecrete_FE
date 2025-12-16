import PasswordInput from "@/components/auth/PasswordInput";
import { Controller, useFormContext } from "react-hook-form";
import { SignUpFormValues } from "@/lib/validations/auth";
import FieldError from "@/components/auth/FieldError";

export default function PasswordField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<SignUpFormValues>();

  return (
    <>
      <div className="passwordInput flex flex-col gap-2">
        <p className="text-sm">비밀번호 *</p>
        <Controller
          name={"password"}
          control={control}
          render={({ field }) => (
            <PasswordInput
              value={field.value}
              onChange={field.onChange}
              placeholder={"비밀번호를 영문, 숫자, 특수문자를 포함한 8자 이상 입력하세요"}
            />
          )}
        />
        {errors.password && <FieldError message={errors.password.message} />}
      </div>
      <div className="passwordConfirm flex flex-col gap-2">
        <p className="text-sm">비밀번호 확인 *</p>
        <Controller
          name="passwordConfirm"
          control={control}
          render={({ field }) => (
            <PasswordInput
              value={field.value ?? ""}
              onChange={field.onChange}
              placeholder={"동일한 비밀번호를 입력하세요"}
            />
          )}
        />
        {errors.passwordConfirm && <FieldError message={errors.passwordConfirm.message} />}
      </div>
    </>
  );
}
