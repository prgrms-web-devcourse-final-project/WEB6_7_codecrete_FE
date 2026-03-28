import { Loader2Icon } from "lucide-react";

export default function RouteLoadingSpinner() {
  return (
    <div className="flex justify-center gap-2 py-8">
      <Loader2Icon className="size-5 animate-spin text-zinc-400" />
      <p className="text-zinc-400">데이터 불러오는 중...</p>
    </div>
  );
}
