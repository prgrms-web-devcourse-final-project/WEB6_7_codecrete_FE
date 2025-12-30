import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function IconLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={cn(
            "hover:bg-muted rounded-sm p-2 hover:font-medium",
            "lg:p-0 lg:hover:bg-transparent"
          )}
        >
          <span className="hidden lg:inline">{label}</span>
          <Icon className="size-4 lg:hidden" />
        </Link>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="lg:hidden">
        {label}
      </TooltipContent>
    </Tooltip>
  );
}
