import { getAuthStatus } from "@/lib/auth/auth.server";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const isLoggedIn = await getAuthStatus();

  if (!isLoggedIn) {
    redirect("/sign-in");
  }

  return <>{children}</>;
}
