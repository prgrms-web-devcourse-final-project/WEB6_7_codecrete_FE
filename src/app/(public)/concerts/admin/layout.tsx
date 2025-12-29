import { getAuthStatus, getMe } from "@/lib/auth/auth.server";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const isLoggedIn = await getAuthStatus();
  let isAdmin = false;

  if (isLoggedIn) {
    const userData = (await getMe()).data;
    isAdmin = userData?.role === "ADMIN";
  }

  try {
    const meResponse = await getMe();
    const userData = meResponse?.data;
    isAdmin = userData?.role === "ADMIN";
  } catch {
    isAdmin = false;
  }

  if (!isAdmin) redirect("/home");

  return <>{children}</>;
}
