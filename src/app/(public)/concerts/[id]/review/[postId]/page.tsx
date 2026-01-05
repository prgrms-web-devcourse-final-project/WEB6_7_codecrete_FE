import BreadcrumbNavbar from "@/components/review/BreadcrumbNavbar";
import ReviewPostMain from "@/components/review/post/ReviewPostMain";
import { getConcertDetail } from "@/lib/api/concerts/concerts.server";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const concertDetail = await getConcertDetail({ concertId: id });

  if (!concertDetail) {
    notFound();
  }

  return (
    <>
      <BreadcrumbNavbar
        items={[
          { label: "홈", href: "/" },
          { label: "공연 목록", href: "/concerts" },
          { label: concertDetail?.name, href: `/concerts/${id}` },
          { label: "리뷰 상세" },
        ]}
      />
      <ReviewPostMain />
    </>
  );
}
