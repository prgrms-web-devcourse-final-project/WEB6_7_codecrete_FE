import MateDetailMain from "@/components/concert-mate/detail/MateDetailMain";
import BreadcrumbNavbar from "@/components/review/BreadcrumbNavbar";

export default function Page() {
  return (
    <>
      <BreadcrumbNavbar
        items={[
          { label: "홈", href: "/home" },
          { label: "구인 게시판", href: "/concert-mate" },
          { label: "글 상세" },
        ]}
      />
      <MateDetailMain />
    </>
  );
}
