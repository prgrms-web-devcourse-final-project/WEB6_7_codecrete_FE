import Link from "next/link";

export default function SignUpFooter() {
  return (
    <>
      <div className="signUpLink flex justify-center gap-1">
        <p className="text-text-sub">이미 계정이 있으신가요?</p>
        <Link href="/sign-in" className="text-text-main hover:text-text-sub">
          로그인
        </Link>
      </div>

      <p className="agreePolicy text-text-sub flex justify-center text-xs">
        계속 진행하시면 당사의 서비스 약관 및 개인정보 보호정책에 동의하는 것으로 간주됩니다.
      </p>
    </>
  );
}
