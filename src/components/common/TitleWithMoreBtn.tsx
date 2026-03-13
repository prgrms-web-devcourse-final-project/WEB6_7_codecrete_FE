import Link from "next/link";

export default function TitleWithMoreBtn({ href, title }: { href: string; title: string }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-bold lg:text-2xl">{title}</h2>
      <Link href={href} className="text-xs text-zinc-500 hover:underline lg:text-sm">
        더보기
      </Link>
    </div>
  );
}
