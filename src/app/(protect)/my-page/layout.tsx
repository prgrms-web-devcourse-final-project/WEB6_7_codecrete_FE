import MyPageHeader from "@/components/my-page/MyPageHeader";
import MyPageNavigation from "@/components/my-page/MyPageNavigation";
import { getPlanList } from "@/lib/api/planner/planner.server";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const planList = await getPlanList();

  return (
    <>
      <MyPageHeader planListCount={planList.length} />
      <MyPageNavigation />
      {children}
    </>
  );
}
