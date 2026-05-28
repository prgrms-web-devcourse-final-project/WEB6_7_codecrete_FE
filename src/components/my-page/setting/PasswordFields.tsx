import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordFieldsProps } from "@/types/my-page";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

export default function PasswordFields({
  currentPassword,
  password,
  passwordConfirm,
  handleCurrentPassword,
  handlePasswordChange,
  handlePasswordConfirmChange,
  isCurrentPasswordFormatValid,
  isPasswordValid,
  isPasswordMatch,
}: PasswordFieldsProps) {
  // 비밀번호 가리기
  const [isVisibleCurrent, setIsVisibleCurrent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  const handleCPWVisible = () => setIsVisibleCurrent((prevState) => !prevState);
  const handlePWCVisible = () => setIsVisibleConfirm((prevState) => !prevState);
  const handlePWVisible = () => setIsVisible((prevState) => !prevState);

  return (
    <>
      <Field>
        <Label htmlFor="nickname">현재 비밀번호</Label>
        <div className="relative space-y-1">
          <Input
            type={isVisibleCurrent ? "text" : "password"}
            placeholder="현재 비밀번호를 입력하세요."
            value={currentPassword}
            onChange={handleCurrentPassword}
            className="pr-9"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCPWVisible}
            className="text-text-sub focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
          >
            {isVisibleCurrent ? <EyeOffIcon /> : <EyeIcon />}
            <span className="sr-only">{isVisibleCurrent ? "Hide password" : "Show password"}</span>
          </Button>
          {currentPassword.length > 0 && (
            <p
              className={`text-xs ${isCurrentPasswordFormatValid ? "text-text-sub" : "text-red-500"}`}
            >
              {isCurrentPasswordFormatValid ? "" : "영문, 숫자, 특수문자 포함 8자 이상 입력하세요."}
            </p>
          )}
        </div>
      </Field>
      <Field>
        <Label htmlFor="nickname">새 비밀번호</Label>
        <div className="relative space-y-1">
          <Input
            type={isVisible ? "text" : "password"}
            placeholder="새 비밀번호를 입력하세요."
            value={password}
            onChange={handlePasswordChange}
            className="pr-9"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePWVisible}
            className="text-text-sub focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
          >
            {isVisible ? <EyeOffIcon /> : <EyeIcon />}
            <span className="sr-only">{isVisible ? "Hide password" : "Show password"}</span>
          </Button>
          {password.length > 0 && (
            <p className={`text-xs ${isPasswordValid ? "text-text-sub" : "text-red-500"}`}>
              {isPasswordValid ? "" : "영문, 숫자, 특수문자 포함 8자 이상 입력하세요."}
            </p>
          )}
        </div>
      </Field>
      <Field>
        <Label htmlFor="nickname">비밀번호 확인</Label>
        <div className="relative space-y-1">
          <Input
            type={isVisibleConfirm ? "text" : "password"}
            placeholder="비밀번호를 입력하세요."
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
            className="pr-9"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePWCVisible}
            className="text-text-sub focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
          >
            {isVisibleConfirm ? <EyeOffIcon /> : <EyeIcon />}
            <span className="sr-only">{isVisibleConfirm ? "Hide password" : "Show password"}</span>
          </Button>
          {passwordConfirm.length > 0 && (
            <p className={`text-xs ${isPasswordMatch ? "text-text-sub" : "text-red-500"}`}>
              {isPasswordMatch ? "" : "비밀번호가 일치하지 않습니다."}
            </p>
          )}
        </div>
      </Field>
    </>
  );
}
