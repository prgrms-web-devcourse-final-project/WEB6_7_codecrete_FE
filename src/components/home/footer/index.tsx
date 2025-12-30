import { Separator } from "@/components/ui/separator";
import { TEAM_MEMBERS } from "./constants";
import TeamSection from "./TeamSection";
import BrandInfo from "./BrandInfo";

export default function Footer() {
  return (
    <footer className="border-border bg-bg-main w-full border-t px-5 py-6 lg:px-15 lg:py-8">
      <div className="mx-auto flex w-full max-w-400 flex-col gap-5 lg:flex-row lg:gap-20">
        {/* Brand Section */}
        <BrandInfo />
        <Separator orientation="horizontal" className="lg:hidden" />
        {/* Team Section */}
        <div className="flex flex-1 flex-col gap-5 lg:flex-row lg:gap-10">
          <TeamSection title="Frontend Developers" members={TEAM_MEMBERS.frontend} />
          <Separator orientation="vertical" className="hidden lg:block" />
          <TeamSection title="Backend Developers" members={TEAM_MEMBERS.backend} columns={2} />
        </div>
      </div>
    </footer>
  );
}
