import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/home" className="shrink-0 dark:brightness-0 dark:invert">
      <Image
        src="/logo_b.svg"
        alt="NCB Ticket"
        width={329}
        height={64}
        className="h-8 w-auto lg:h-12"
        priority
      />
    </Link>
  );
}
