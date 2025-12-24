import AdminConcertListWrapper from "@/components/concert/admin/AdminConcertListWrapper";
import BreadcrumbNavbar from "@/components/review/BreadcrumbNavbar";
import { getNoTicketTimeLists } from "@/lib/api/admin";

export default async function Page() {
  const initialList = await getNoTicketTimeLists({ page: 0, size: 12 });

  if (!initialList) {
    return (
      <>
        <BreadcrumbNavbar items={[{ label: "홈", href: "/" }, { label: "어드민 공연 목록" }]} />
        <div className="p-4">티켓팅 시간이 없는 공연이 없습니다.</div>
      </>
    );
  }

  return (
    <>
      <BreadcrumbNavbar items={[{ label: "홈", href: "/" }, { label: "어드민 공연 목록" }]} />
      <AdminConcertListWrapper initialList={initialList} />
    </>
  );
}
