// TODO: 인원 수를 서버 데이터 기반으로 치환

import { ArrowLeft, Calendar } from "lucide-react";
import InfoBadge from "@/components/concert/chat/InfoBadge";
import { ConcertDetail } from "@/types/concerts";
import { Client } from "@stomp/stompjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ChatHeader({
  concert,
  stompClient,
}: {
  concert: ConcertDetail | null;
  stompClient: Client | null;
}) {
  const router = useRouter();
  const [userCount, setUserCount] = useState<number>(0);

  useEffect(() => {
    if (!stompClient?.connected || !concert?.concertId) return;

    const subscription = stompClient.subscribe(
      `/topic/chat/${concert.concertId}/count`,
      (message) => {
        setUserCount(Number(message.body));
      }
    );

    stompClient.publish({
      destination: "/app/chat/status",
      body: JSON.stringify({
        concertId: Number(concert.concertId),
      }),
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [stompClient, stompClient?.connected, concert?.concertId]);

  const handleBack = () => {
    router.push(`/concerts/${concert?.concertId}`);
  };

  return (
    <header className={`bg-bg-main flex gap-8`}>
      <div className={"flex w-full justify-between px-8 py-4"}>
        {/*헤더 좌측*/}
        <div className={"flex items-center gap-7"}>
          <button
            className={"cursor-pointer"}
            type={"button"}
            onClick={handleBack}
            aria-label={"뒤로가기"}
          >
            <ArrowLeft />
          </button>
          <div className={"flex flex-col"}>
            <h2 className={"text-xl font-bold"}>{concert?.name}</h2>
            <h3 className={"text-text-sub"}>실시간 채팅방</h3>
          </div>
        </div>
        {/*헤더 우측*/}
        <div className={"inline-flex gap-6 px-2 py-3"}>
          {/*날짜*/}
          <InfoBadge>
            <Calendar size={14} className={"text-text-sub"} />
            <span className="leading-5 font-medium">{concert?.startDate}</span>
          </InfoBadge>
          {/*인원*/}
          <InfoBadge>
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span className="leading-5 font-medium">{userCount}</span>
          </InfoBadge>
        </div>
      </div>
    </header>
  );
}
