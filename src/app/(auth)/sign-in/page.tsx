import SocialButton from "@/components/auth/SocialButton";
import SignInIntro from "@/components/auth/sign-in/SignInIntro";
import SignInForm from "@/components/auth/sign-in/SignInForm";
import SignUpLink from "@/components/auth/sign-in/SignUpLink";
import PolicyText from "@/components/auth/sign-in/PolicyText";

export default function Page() {
  return (
    <div className="flex w-full max-w-200 flex-col justify-center gap-10 px-12">
      <SignInIntro />
      <SocialButton />
      <SignInForm />
      <SignUpLink />
      <PolicyText />
      {/*TODO: 반응형 */}
    </div>
  );
}
