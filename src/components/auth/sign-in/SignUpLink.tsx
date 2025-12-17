import Link from "next/link";

export default function SignUpLink() {
  return (
    <div className="signUpLink flex justify-center gap-1">
      <p className="text-text-sub">계정이 없으신가요?</p>
      <Link href="/sign-up" className="text-text-main hover:text-text-sub">
        회원가입
      </Link>
    </div>
  );
}
