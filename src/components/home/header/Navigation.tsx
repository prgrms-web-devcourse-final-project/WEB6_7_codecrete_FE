import { cn } from "@/lib/utils";
import Link from "next/link";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "text-text-main relative inline-block transition-all duration-300 ease-in-out hover:-translate-y-0.5",
        "before:bg-border-point before:absolute before:right-0 before:-bottom-0.5 before:left-0 before:-z-10 before:h-0.5 before:origin-bottom before:scale-y-0 before:transition-transform before:duration-300 before:ease-in-out",
        "hover:before:scale-y-100"
      )}
    >
      {children}
    </Link>
  );
}

export default function Navigation({ isAdmin }: { isAdmin: boolean }) {
  const navLinks = [
    { href: "/concerts", label: "공연" },
    ...(isAdmin ? [{ href: "/concerts/admin", label: "관리자" }] : []),
    { href: "/artists", label: "아티스트" },
    { href: "/concert-mate", label: "동행구인" },
    { href: "/planner", label: "외출플래너" },
  ];

  return (
    <nav className="space-x-5 text-base font-semibold text-zinc-900 lg:space-x-15 lg:text-lg xl:text-xl">
      {navLinks.map((link) => (
        <NavLink key={link.href} href={link.href}>
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
