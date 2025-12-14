import ReviewWriteMain from "@/components/review/write/ReviewWriteMain";
import BreadcrumbNavbar from "@/components/review/BreadcrumbNavbar";

export default function Page() {
  return (
    <>
      <BreadcrumbNavbar
        items={[
          { label: "홈", href: "/" },
          { label: "리뷰 게시판", href: "/review" },
          { label: "글 작성" },
        ]}
      />
      <ReviewWriteMain />
    </>
  );
}
