// TODO:
// - 채팅 히스토리가 많아질 경우, 날짜 단위로 메시지를 그룹화하여
//   "YYYY년 M월 D일" 형태의 날짜 구분선을 표시
// - 사용자의 입장/퇴장 이벤트를 시스템 메시지로 구분하여 렌더링
//   (ex. "OOO님이 입장했습니다", "OOO님이 퇴장했습니다")
// - 일반 채팅 메시지 / 시스템 메시지 / 날짜 구분 메시지를
//   서로 다른 타입으로 분리하여 렌더링 구조 개선
// - 과거 채팅 로딩 시 무한 스크롤 또는 페이지네이션 방식으로 확장
// - 채팅이 없는 경우 보여줄 텍스트 만들기
// - 같은 사용자가 연속적으로 채팅할 경우 이름은 안뜨고 채팅만 뜨도록 구현하기

import { Pin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { getChatMessages } from "@/lib/api/chat/chat.client";
import { useChatStore } from "@/stores/useChatStore";
import { Client } from "@stomp/stompjs";
import { toast } from "sonner";
import { User } from "@/types/user";
import ChatMessage from "@/components/concert/chat/ChatMessage";

export default function ChatRoom({
  concertId,
  stompClient,
  user,
}: {
  concertId: string;
  stompClient: Client | null;
  user: User | null;
}) {
  const { messages, setMessages } = useChatStore();
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchMessages = async () => {
      const data = await getChatMessages(concertId);
      if (mounted) {
        setMessages(data);
        setIsLoading(false);
      }
    };

    fetchMessages();

    return () => {
      mounted = false;
    };
  }, [concertId, setMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      return;
    }

    if (!stompClient || !stompClient.connected) {
      toast.error("서버와의 연결이 끊어졌습니다. 새로고침 해주세요.");
      return;
    }

    // Swagger 문서의 규격에 맞춰 전송
    stompClient.publish({
      destination: "/app/chat/send", // 전송 목적지
      body: JSON.stringify({
        concertId: Number(concertId), // 숫자로 변환 필요 여부 확인
        content: inputValue,
      }),
    });

    setInputValue(""); // 전송 후 입력창 비우기
  };

  return (
    <section className="bg-bg-main flex flex-1 flex-col border-r">
      <div className={"bg-bg-sub flex gap-3 border-b px-8 py-3"}>
        <Pin size={14} className="text-text-sub mt-1 fill-current" strokeWidth={1.5} />
        <div className={"flex flex-col"}>
          <h3>채팅 가이드라인</h3>
          <p className={"text-text-sub text-xs"}>
            티켓 스크린샷이나 개인정보는 공유하지 마세요. 티켓 거래는 트랜스퍼 보드를 이용해 주세요.
            모든 참여자를 존중해 주세요.
          </p>
        </div>
      </div>
      <div
        className={
          "scrollbar-hide bg-bg-main flex flex-1 flex-col gap-6 overflow-y-scroll border-b p-8"
        }
      >
        {/*TODO: 나중에 스켈레톤으로 변경 */}
        {isLoading && (
          <div className={"flex items-center justify-center"}>
            <p>채팅 불러오는 중...</p>
          </div>
        )}
        {/*<div className={"flex justify-center"}>*/}
        {/*  <InfoBadge>*/}
        {/*    <span className={"text-text-sub"}>오늘 - 2025년 12월 8일</span>*/}
        {/*  </InfoBadge>*/}
        {/*</div>*/}
        {/*<div className={"flex justify-center"}>*/}
        {/*  <span className={"text-text-sub"}>User_8472님이 입장했습니다</span>*/}
        {/*</div>*/}
        {/*<div className={"flex justify-center"}>*/}
        {/*  <span className={"text-text-sub"}>User_8472님이 입장했습니다</span>*/}
        {/*</div>*/}
        {/*TODO: 자신이 보낸 메시지인지 판단 추가(isMe), 메시지가 없는 경우 알림 추가*/}
        {messages.map((msg, idx) => {
          // 1. 내 정보와 메시지 발신자 ID 비교 (isMe 판단)
          const isMe = user?.id === msg.senderId;

          // 2. 서버의 sentDate(ISO string)를 "오후 5:46" 형식으로 변환
          const formattedTime = new Date(msg.sentDate).toLocaleTimeString("ko-KR", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });

          return (
            <ChatMessage
              key={`${msg.messageId}-${idx}`}
              profileImage={msg.profileImage} // 서버 데이터에 프로필 이미지가 있는 경우
              username={msg.senderName}
              message={msg.content}
              time={formattedTime}
              isMe={isMe}
            />
          );
        })}
      </div>
      <form onSubmit={handleSend} className={"bg-bg-sub flex items-center gap-3 px-6 py-4"}>
        <Input
          className={"bg-bg-main px-6 py-5"}
          placeholder={"채팅을 입력하세요."}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button className={"flex h-full gap-2"} size={"lg"} type={"submit"} disabled={!stompClient}>
          <Send className={"fill-current"} />
          전송
        </Button>
      </form>
    </section>
  );
}
