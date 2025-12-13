import { DatePicker } from "@/components/auth/DatePicker";
import PasswordInput from "@/components/auth/PasswordInput";
import SocialButton from "@/components/auth/SocialButton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex w-full max-w-200 flex-col justify-center gap-10 px-12">
      <div className="intro flex flex-col gap-2">
        <p className="text-text-main text-3xl font-bold">회원가입</p>
        <span className="text-text-sub">
          Nae-Con-Bu에 가입하여 콘서트를 발견하고, 동행을 구해보세요
        </span>
      </div>

      <SocialButton />

      <div className="input flex flex-col gap-6">
        <div className="nicknameInput flex flex-col gap-2">
          <p className="text-sm">닉네임 *</p>
          <div className="flex w-full items-center gap-2">
            <Input type="text" placeholder="Enter Your Nickname" className="bg-point-sub h-13" />
            <Button type="submit" variant="default" size="lg" className="bg-point-main h-13">
              Confirm
            </Button>
          </div>
          <p className="text-text-sub text-xs">중복된 닉네임입니다.</p>
        </div>

        <div className="emailInput flex flex-col gap-2">
          <p className="text-sm">이메일 *</p>
          <div className="flex w-full items-center gap-2">
            <Input type="email" placeholder="Enter Your Email" className="bg-point-sub h-13" />
            <Button type="submit" variant="default" size="lg" className="bg-point-main h-13">
              Confirm
            </Button>
          </div>
          <p className="text-text-sub text-xs">인증을 완료하세요.</p>
        </div>

        <div className="emailConfirm flex flex-col gap-2">
          <p className="text-sm">이메일 인증 *</p>
          <div className="flex w-full items-center gap-2">
            <Input
              type="number"
              placeholder="Enter Validation Number"
              className="bg-point-sub h-13"
            />
            <Button type="submit" variant="default" size="lg" className="bg-point-main h-13">
              Confirm
            </Button>
          </div>
          <p className="text-text-sub text-xs">인증번호를 입력하세요.</p>
        </div>

        <div className="passwordInput flex flex-col gap-2">
          <p className="text-sm">비밀번호 *</p>
          <PasswordInput />
          <p className="text-text-sub text-xs">영문, 숫자 8자 이상 입력하세요.</p>
        </div>
        <div className="passwordConfirm flex flex-col gap-2">
          <p className="text-sm">비밀번호 확인 *</p>
          <PasswordInput />
          <p className="text-text-sub text-xs">동일한 비밀번호를 입력하세요.</p>
        </div>

        <DatePicker />

        <div className="agreeCheckbox flex items-center gap-2">
          <Checkbox className="cursor-pointer" />
          <Label className="text-text-sub">서비스 약관 및 개인정보 처리방침에 동의합니다.</Label>
        </div>
        <div className="alarmCheckbox flex items-center gap-2">
          <Checkbox className="cursor-pointer" />
          <Label className="text-text-sub">콘서트 소식과 프로모션 이메일을 보내주세요.</Label>
        </div>

        <Button className="signUpButton cursor-pointer" variant="default" size="lg" asChild={false}>
          회원가입
        </Button>

        <div className="signUpLink flex justify-center gap-1">
          <p className="text-text-sub">이미 계정이 있으신가요?</p>
          <Link href="/sign-in" className="text-text-main hover:text-text-sub">
            로그인
          </Link>
        </div>

        <p className="agreePolicy text-text-sub flex justify-center text-xs">
          계속 진행하시면 당사의 서비스 약관 및 개인정보 보호정책에 동의하는 것으로 간주됩니다.
        </p>
      </div>
    </div>
  );
}
