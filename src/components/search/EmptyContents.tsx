import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";
import { MicVocalIcon, SpotlightIcon } from "lucide-react";

export default function EmptyContents({ type }: { type: "concerts" | "artists" }) {
  return (
    <div className="py-40">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            {type === "concerts" ? <SpotlightIcon /> : <MicVocalIcon />}
          </EmptyMedia>
          <EmptyTitle>검색 결과 없음</EmptyTitle>
          <EmptyDescription>
            검색어에 해당하는 {type === "concerts" ? "공연" : "아티스트"}가 없습니다.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
