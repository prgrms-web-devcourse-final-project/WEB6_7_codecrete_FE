import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";
import { MicVocalIcon, SpotlightIcon } from "lucide-react";

export default function EmptyContents({ type }: { type: "concerts" | "artists" }) {
  return (
    <Empty className="py-0!">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          {type === "concerts" ? <SpotlightIcon /> : <MicVocalIcon />}
        </EmptyMedia>
        <EmptyTitle>{type === "concerts" ? "공연" : "아티스트"} 검색 결과 없음</EmptyTitle>
        <EmptyDescription>
          검색어에 해당하는 {type === "concerts" ? "공연이" : "아티스트가"} 없습니다.
          <br />
          다른 검색어로 시도해보세요.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
