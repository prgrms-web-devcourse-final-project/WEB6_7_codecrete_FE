import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { SearchIcon } from "lucide-react";

export default function SearchButton() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className={cn(
            "text-text-sub hover:bg-muted relative rounded-sm p-2 text-left",
            "lg:border-border lg:bg-bg-sub lg:h-13 lg:w-full lg:max-w-md lg:cursor-text lg:rounded-4xl lg:border lg:pr-6 lg:pl-16 lg:font-medium"
          )}
        >
          <SearchIcon
            size={16}
            className="stroke-zinc-500 lg:absolute lg:top-1/2 lg:left-6 lg:-translate-y-1/2"
          />
          <span className="hidden lg:inline">좋아하는 가수를 검색해보세요.</span>
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="lg:hidden">
        검색
      </TooltipContent>
    </Tooltip>
  );
}
