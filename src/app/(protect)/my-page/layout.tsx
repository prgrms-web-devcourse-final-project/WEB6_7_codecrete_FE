import MyPageHeader from "@/components/my-page/MyPageHeader";
import MyPageNavigation from "@/components/my-page/MyPageNavigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MyPageHeader />
      <MyPageNavigation />
      {children}
    </>
  );
}
