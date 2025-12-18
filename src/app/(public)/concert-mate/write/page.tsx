import MateWriteMain from "@/components/concert-mate/write/MateWriteMain";
import BreadcrumbNavbar from "@/components/review/BreadcrumbNavbar";

export default function Page() {
  return (
    <>
      <BreadcrumbNavbar
        items={[
          { label: "홈", href: "/" },
          { label: "구인 게시판", href: "/concert-mate" },
          { label: "글 작성" },
        ]}
      />
      <MateWriteMain />
    </>
  );
}
