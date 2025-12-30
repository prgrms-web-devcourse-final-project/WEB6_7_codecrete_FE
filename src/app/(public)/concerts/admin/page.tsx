import AdminConcertListWrapper from "@/components/concert/admin/AdminConcertListWrapper";
import BreadcrumbNavbar from "@/components/review/BreadcrumbNavbar";

export default async function Page() {
  return (
    <>
      <BreadcrumbNavbar items={[{ label: "홈", href: "/" }, { label: "어드민 공연 목록" }]} />
      <AdminConcertListWrapper />
    </>
  );
}
