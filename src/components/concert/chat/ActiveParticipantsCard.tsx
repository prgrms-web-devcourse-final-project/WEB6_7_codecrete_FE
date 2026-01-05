import { useEffect, useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import InfoBadge from "@/components/concert/chat/InfoBadge";
import ParticipantItem from "@/components/concert/chat/ParticipantItem";
import { Button } from "@/components/ui/button";
import { Client } from "@stomp/stompjs";

interface ServerParticipant {
  userId: number;
  nickname: string;
  profileImage: string;
}

export default function ActiveParticipantsCard({
  concertId,
  stompClient,
}: {
  concertId: string | undefined;
  stompClient: Client | null;
}) {
  const [participants, setParticipants] = useState<ServerParticipant[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!stompClient || !stompClient.connected || !concertId) return;

    const subscription = stompClient.subscribe(`/topic/chat/${concertId}/users`, (message) => {
      try {
        const userList: ServerParticipant[] = JSON.parse(message.body);
        setParticipants(userList);
      } catch (error) {
        console.error("참여자 목록 파싱 에러:", error);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [stompClient, stompClient?.connected, concertId]);

  return (
    <Card className="flex flex-col gap-4 p-7">
      {/* Header */}
      <div className="flex items-center justify-between">
        <CardTitle className="text-text-main text-xl font-bold">현재 참여자</CardTitle>

        <InfoBadge>
          <span className="text-text-sub">{participants.length}</span>
        </InfoBadge>
      </div>

      {/* Scrollable List */}
      <div
        className={`flex max-h-[238px] flex-col gap-3 overscroll-contain pr-2 ${
          showAll ? "scrollbar-hide overflow-y-auto" : "overflow-hidden"
        }`}
      >
        {participants.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-text-sub text-xs">참여자를 불러오는 중입니다...</p>
          </div>
        ) : (
          (showAll ? participants : participants.slice(0, 5)).map((user) => (
            <ParticipantItem
              key={user.userId}
              name={user.nickname}
              statusText="현재 활동 중"
              online={true}
              imageUrl={user.profileImage}
            />
          ))
        )}
      </div>

      {/* View All Button (조건부) */}
      {participants.length > 5 && (
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
