import { cn } from "@/lib/utils";
import Link from "next/link";

interface TeamSectionProps {
  title: string;
  members: readonly { name: string; url: string }[];
  columns?: 1 | 2;
}

export default function TeamSection({ title, members, columns = 1 }: TeamSectionProps) {
  return (
    <div className="flex-1 space-y-2 lg:space-y-3">
      <h3 className="font-semibold">{title}</h3>
      <nav
        aria-label={title}
        className={cn(
          "flex flex-wrap gap-2 lg:grid lg:gap-1",
          columns === 2 ? "grid-cols-2" : "grid-cols-1"
        )}
      >
        {members.map((member) => (
          <Link
            key={member.name}
            href={member.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-sub text-xs font-medium hover:underline"
          >
            @{member.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
