import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/home" className="shrink-0 dark:brightness-0 dark:invert">
      <Image
        src="/logo_b.webp"
        alt="NCB Ticket"
        width={329}
        height={64}
        className="h-8 w-auto lg:h-12"
        priority
        sizes="(min-width: 1024px) 329px, 161px"
        fetchPriority="high"
      />
    </Link>
  );
}
