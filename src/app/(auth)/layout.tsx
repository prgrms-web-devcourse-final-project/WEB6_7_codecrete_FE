import { getAuthStatus } from "@/lib/auth/auth.server";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const isLoggedIn = await getAuthStatus();

  if (isLoggedIn) {
    redirect("/home");
  }

  return (
    <div className="grid min-h-screen grid-cols-2">
      {/* TODO: 왼쪽 이미지 */}
      <div className="bg-point-main flex-1"></div>
      <div className="bg-bg-main flex flex-1 justify-center p-20">{children}</div>
    </div>
  );
}
