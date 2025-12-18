import SocialButton from "@/components/auth/SocialButton";
import SignUpIntro from "@/components/auth/sign-up/SignUpIntro";
import SignUpForm from "@/components/auth/sign-up/SignUpForm";
import SignUpFooter from "@/components/auth/sign-up/SignUpFooter";

export default function Page() {
  return (
    <div className="flex w-full max-w-200 flex-col justify-center gap-10 px-12">
      <SignUpIntro />
      <SocialButton />
      <SignUpForm />
      <SignUpFooter />
    </div>
  );
}
