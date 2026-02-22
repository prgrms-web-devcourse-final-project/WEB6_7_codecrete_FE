import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";
import { MicVocalIcon, SpotlightIcon } from "lucide-react";

export default function EmptyContents({ type }: { type: "concerts" | "artists" }) {
  return (
    <Empty className="py-0!">
      <EmptyHeader className="gap-1 lg:gap-2">
        <EmptyMedia variant="icon">
          {type === "concerts" ? (
            <SpotlightIcon className="size-5 lg:size-6" />
          ) : (
            <MicVocalIcon className="size-5 lg:size-6" />
          )}
        </EmptyMedia>
        <EmptyTitle className="text-base font-semibold lg:text-lg">
          {type === "concerts" ? "공연" : "아티스트"} 검색 결과 없음
        </EmptyTitle>
        <EmptyDescription className="text-xs lg:text-sm">
          검색어에 해당하는 {type === "concerts" ? "공연이" : "아티스트가"} 없습니다.
          <br />
          다른 검색어로 시도해보세요.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
