import MateListContent from "@/components/concert-mate/list/MateListContent";
import MateListIntro from "@/components/concert-mate/list/MateListIntro";
import BreadcrumbNavbar from "@/components/review/BreadcrumbNavbar";

export default function Page() {
  return (
    <>
      <BreadcrumbNavbar items={[{ label: "홈", href: "/" }, { label: "구인 게시판" }]} />
      <MateListIntro />
      <MateListContent />
    </>
  );
}
