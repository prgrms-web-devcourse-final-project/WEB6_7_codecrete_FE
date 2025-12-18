import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import InfoBadge from "@/components/concert/chat/InfoBadge";
import ParticipantItem from "@/components/concert/chat/ParticipantItem";
import { Button } from "@/components/ui/button";

// TODO:
// - 참여자 목록을 서버(API/WebSocket)에서 받아 실시간으로 갱신
// - statusText를 서버 기준 시간으로 계산하여 동적 생성
// - online 상태 변경 시 애니메이션 또는 강조 효과 추가
const PARTICIPANTS = [
  {
    id: 1,
    name: "MusicFan_2024",
    statusText: "현재 활동 중",
    online: true,
    imageUrl: "https://example.com/images/user1.png",
  },
  {
    id: 2,
    name: "JazzLover88",
    statusText: "2분 전 활동",
    online: false,
    imageUrl: "https://example.com/images/user2.png",
  },
  {
    id: 3,
    name: "RockStar99",
    statusText: "5분 전 활동",
    online: false,
    imageUrl: "https://example.com/images/user3.png",
  },
  {
    id: 4,
    name: "ClassicalQueen",
    statusText: "현재 활동 중",
    online: true,
    imageUrl: "https://example.com/images/user4.png",
  },
  {
    id: 5,
    name: "PopGuru",
    statusText: "10분 전 활동",
    online: false,
    imageUrl: "https://example.com/images/user5.png",
  },
  {
    id: 6,
    name: "IndieVibes",
    statusText: "1분 전 활동",
    online: true,
    imageUrl: "https://example.com/images/user6.png",
  },
  {
    id: 7,
    name: "IndieVibes",
    statusText: "1분 전 활동",
    online: true,
    imageUrl: "https://example.com/images/user6.png",
  },
  {
    id: 8,
    name: "IndieVibes",
    statusText: "1분 전 활동",
    online: true,
    imageUrl: "https://example.com/images/user6.png",
  },
] as const;

export default function ActiveParticipantsCard() {
  const [showAll, setShowAll] = useState(false);

  return (
    <Card className="flex flex-col gap-4 p-7">
      {/* Header */}
      <div className="flex items-center justify-between">
        <CardTitle className="text-text-main text-xl font-bold">현재 참여자</CardTitle>

        <InfoBadge>
          <span className="text-text-sub">{PARTICIPANTS.length}</span>
        </InfoBadge>
      </div>
      {/* Scrollable List */}
      {/*TODO: 디자인 확정 후 ParticipantItem 높이 기준으로 리스트 영역 높이를 (5개 기준) calc()로 재조정*/}

      <div
        className={`flex max-h-[238px] flex-col gap-3 overscroll-contain pr-2 ${showAll ? "scrollbar-hide overflow-y-auto" : ""}`}
      >
        {(showAll ? PARTICIPANTS : PARTICIPANTS.slice(0, 5)).map((user) => (
          <ParticipantItem
            key={user.id}
            name={user.name}
            statusText={user.statusText}
            online={user.online}
            imageUrl={user.imageUrl}
          />
        ))}
      </div>
      {/* View All Button (조건부) */}
      {PARTICIPANTS.length > 5 && (
        <Button
          type="button"
          size={"lg"}
          variant={"outline"}
          className="text-text-sub mt-2 rounded-lg border py-3 text-center font-bold"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "접기" : "전체 참여자 보기"}
        </Button>
      )}
    </Card>
  );
}
