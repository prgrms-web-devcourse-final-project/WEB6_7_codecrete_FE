import MyPageHeader from "@/components/my-page/MyPageHeader";
import MyPageNavigation from "@/components/my-page/MyPageNavigation";
import { getMe } from "@/lib/api/auth/auth.server";
import { getPlanList } from "@/lib/api/planner/planner.server";
import { User } from "@/types/user";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const res = await getMe();
  const userData = res.data as User;

  const planList = await getPlanList();

  return (
    <>
      <MyPageHeader userData={userData} planListCount={planList.length} />
      <MyPageNavigation />
      {children}
    </>
  );
}
