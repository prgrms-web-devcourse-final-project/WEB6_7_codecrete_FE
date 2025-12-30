"use client";

import { ArrowRightIcon, SearchIcon } from "lucide-react";
import { useEffect, useState, useTransition, useOptimistic } from "react";
import { AutoCompleteConcerts } from "@/types/search";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";
import { DialogTitle } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { getSearchConcertsAutoComplete } from "@/lib/api/search.client";

export default function SearchModal() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [concertsResult, setConcertsResult] = useState<AutoCompleteConcerts[]>([]);

  // 낙관적 업데이트
  const [optimisticResults, setOptimisticResults] = useOptimistic<
    AutoCompleteConcerts[],
    AutoCompleteConcerts[]
  >(concertsResult, (_, newResults) => newResults);

  // 모달이 닫힐 때 초기화
  useEffect(() => {
    if (!open) {
      startTransition(() => {
        setSearch("");
        setConcertsResult([]);
      });
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    // 검색어가 2글자 미만이면 초기화
    if (search.trim().length < 2) {
      startTransition(() => {
        setConcertsResult([]);
      });
      return;
    }

    const delayTimer = setTimeout(() => {
      startTransition(async () => {
        try {
          setOptimisticResults([]);

          const data = await getSearchConcertsAutoComplete({
            keyword: search,
            start: 0,
            end: 5,
          });
          setConcertsResult(data);
        } catch (error) {
          console.error("검색 오류:", error);
          setConcertsResult([]);
        }
      });
    }, 300);

    return () => clearTimeout(delayTimer);
  }, [search, open, setOptimisticResults]);

  // 빈 상태 메시지
  const getEmptyMessage = () => {
    if (isPending && search.trim().length >= 2) {
      return "검색 중...";
    }
    if (search.trim() === "") {
      return "검색어를 입력해주세요.";
    }
    if (search.trim().length < 2) {
      return "2글자 이상 입력해주세요.";
    }
    return "검색 결과가 없습니다.";
  };

  // 검색 이벤트
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.trim().length >= 2) {
      e.preventDefault();
      router.push(`/search/overview?keyword=${encodeURIComponent(search.trim())}`);
      setOpen(false);
    }
  };

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={cn(
              "text-text-sub hover:bg-muted relative rounded-sm p-2 text-left",
              "lg:border-border lg:bg-bg-sub lg:h-13 lg:w-full lg:max-w-md lg:cursor-text lg:rounded-4xl lg:border lg:pr-6 lg:pl-16 lg:font-medium"
            )}
            onClick={() => setOpen(true)}
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl overflow-hidden">
          <DialogHeader className="hidden">
            <DialogTitle>검색</DialogTitle>
          </DialogHeader>
          <div className="relative">
            <SearchIcon
              size={16}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-500"
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="공연이나 가수를 검색해보세요..."
              className="focus-visible:border-border border-border h-12 rounded-none border-0 border-b pr-12 pl-10 focus-visible:ring-0"
              autoFocus
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="max-h-200 overflow-y-auto">
            {optimisticResults.length === 0 ? (
              <div className="text-muted-foreground py-10 text-center text-sm">
                {getEmptyMessage()}
              </div>
            ) : (
              <div className="text-foreground overflow-hidden p-1">
                <h4 className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
                  공연
                  {isPending && <span className="ml-2 text-xs">업데이트 중...</span>}
                </h4>
                {optimisticResults.map((concert) => (
                  <button
                    key={concert.id}
                    onClick={() => {
                      router.push(`/concerts/${concert.id}`);
                      setOpen(false);
                    }}
                    className={cn(
                      "hover:bg-accent hover:text-accent-foreground relative flex w-full cursor-pointer items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden",
                      isPending && "opacity-70"
                    )}
                  >
                    <span className="line-clamp-1 text-ellipsis whitespace-nowrap">
                      {concert.name}
                    </span>
                    <ArrowRightIcon className="size-3" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
