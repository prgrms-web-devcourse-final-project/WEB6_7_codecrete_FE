import PasswordInput from "@/components/auth/PasswordInput";
import Separator from "@/components/auth/Separator";
import SocialButton from "@/components/auth/SocialButton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignIn() {
  return (
    <div className="flex flex-col justify-center gap-10 px-12">
      <div className="intro flex flex-col gap-2">
        <p className="text-text-main text-3xl font-bold">환영합니다</p>
        <span className="text-text-sub">계정에 로그인하여 계속 진행하세요</span>
      </div>

      <SocialButton />
      <Separator />

      <div className="input flex flex-col gap-3">
        <Input placeholder="Email Address" className="h-13" />
        <PasswordInput />
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Checkbox className="cursor-pointer" />
            <Label>아이디 저장</Label>
          </div>
          {/* <Link href="/sign-up" className="text-text-sub cursor-pointer hover:text-text-main">
                비밀번호를 잊으셨나요?
              </Link> */}
        </div>
        <Button className="login cursor-pointer" variant="default" size="lg" asChild={false}>
          로그인
        </Button>
      </div>

      <div className="signUpLink flex justify-center gap-1">
        <p className="text-text-sub">계정이 없으신가요?</p>
        <Link href="/sign-up" className="text-text-main hover:text-text-sub">
          회원가입
        </Link>
      </div>

      <p className="agreePolicy text-text-sub flex justify-center text-xs">
        계속 진행하시면 당사의 서비스 약관 및 개인정보 보호정책에 동의하는 것으로 간주됩니다.
      </p>

      {/* TODO: 반응형 */}
    </div>
  );
}
