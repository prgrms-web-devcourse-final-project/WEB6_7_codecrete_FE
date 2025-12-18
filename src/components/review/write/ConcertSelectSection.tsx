import { Button } from "@/components/ui/button";
import { CardContent, CardTitle } from "@/components/ui/card";

/*
 * TODO: 공연 선택 기능 구현
 *
 * - 공연 목록은 하드코딩 → 추후 API 응답 데이터로 교체
 * - SelectItem의 value는 공연 id(concertId) 사용
 *
 * - 부모 컴포넌트에서
 *   - selectedConcertId 상태 관리
 *   - onSelectConcert(concertId) 함수 정의
 *
 * - Select의 onValueChange로
 *   - 선택된 concertId를 부모로 전달
 *
 * - 선택된 공연 정보에 따라
 *   - 아래 SelectedConcertCard 렌더링
 */

type ConcertSelectSectionProps = {
  onClick: () => void;
};

export default function ConcertSelectSection({ onClick }: ConcertSelectSectionProps) {
  return (
    <CardContent className={"flex flex-col gap-2"}>
      <CardTitle>
        공연 선택 <span className={"text-text-sub"}>*</span>
      </CardTitle>
      <Button variant="outline" onClick={onClick}>
        어떤 공연을 보고 오셨나요?
      </Button>
      {/* <Select>
        <SelectTrigger className={"h-13! w-full px-4 py-3"}>
          <SelectValue placeholder={"어떤 공연을 보고 오셨나요?"} />{" "}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>공연명</SelectLabel>
            {/*TODO: 나중에 value 부분을 해당 공연의 id로 바꾸기
            <SelectItem value="apple">YE LIVE IN KOREA</SelectItem>
            <SelectItem value="banana">CIRCUS MAXIMUS in Korea</SelectItem>
            <SelectItem value="blueberry">ZUTOMAYO INTENSE II 「坐・ZOMBIE CRAB LABO」</SelectItem>
            <SelectItem value="grapes">IU HEREH World Tour</SelectItem>
            <SelectItem value="pineapple">ONE OK ROCK DETOX Asia Tour 2026 in Korea</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select> */}
    </CardContent>
  );
}
