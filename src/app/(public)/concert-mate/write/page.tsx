import PageHeader from "@/components/common/PageHeader";
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
      <PageHeader
        title="당신의 공연 Mate를 찾아보세요!"
        description="아티스트도, 좌석도, 취향도 맞는 Mate를 찾아보세요. 상세하게 적을수록 딱 맞는 공연 파트너를 만날 확률이 높아져요!"
      />
      <MateWriteMain />
    </>
  );
}
