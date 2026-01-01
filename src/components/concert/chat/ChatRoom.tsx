// TODO:
// - 사용자의 입장/퇴장 이벤트를 시스템 메시지로 구분하여 렌더링
//   (ex. "OOO님이 입장했습니다", "OOO님이 퇴장했습니다")
// - 일반 채팅 메시지 / 시스템 메시지 / 날짜 구분 메시지를
//   서로 다른 타입으로 분리하여 렌더링 구조 개선
// - 과거 채팅 로딩 시 무한 스크롤 또는 페이지네이션 방식으로 확장
// - 채팅이 없는 경우 보여줄 텍스트 만들기

import { Pin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { getChatMessages } from "@/lib/api/chat/chat.client";
import { useChatStore } from "@/stores/useChatStore";
import { Client } from "@stomp/stompjs";
import { toast } from "sonner";
import { User } from "@/types/user";
import ChatMessage from "@/components/concert/chat/ChatMessage";
import InfoBadge from "@/components/concert/chat/InfoBadge";

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

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading) return; // 로딩 중일 때는 실행하지 않음

    const container = containerRef.current;
    if (container) {
      // 브라우저가 DOM 요소들의 높이를 계산할 시간을 아주 잠깐 줍니다.
      requestAnimationFrame(() => {
        container.scrollTop = container.scrollHeight;
      });
    }
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;

    const container = containerRef.current;
    if (!container) return;

    const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 150;

    if (isAtBottom || messages.length <= 1) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

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
        ref={containerRef}
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

        {/*</div>*/}
        {/*<div className={"flex justify-center"}>*/}
        {/*  <span className={"text-text-sub"}>User_8472님이 입장했습니다</span>*/}
        {/*</div>*/}
        {/*<div className={"flex justify-center"}>*/}
        {/*  <span className={"text-text-sub"}>User_8472님이 입장했습니다</span>*/}
        {/*</div>*/}

        {messages.map((msg, idx) => {
          const isMe = user?.id === msg.senderId;

          const getFullDate = (dateStr: string) =>
            new Date(dateStr).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });

          const currentDate = getFullDate(msg.sentDate);
          const prevDate = idx > 0 ? getFullDate(messages[idx - 1].sentDate) : null;

          // 날짜가 바뀌었는지 확인 (첫 메시지거나 이전 날짜와 다를 때)
          const isNewDay = currentDate !== prevDate;

          // "오늘" 여부 판단
          const isToday = currentDate === getFullDate(new Date().toISOString());
          const dateLabel = isToday ? `오늘 - ${currentDate}` : currentDate;

          const formattedTime = (dateStr: string) =>
            new Date(dateStr).toLocaleTimeString("ko-KR", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            });

          const currentTime = formattedTime(msg.sentDate);
          const prevMsg = messages[idx - 1];
          const nextMsg = messages[idx + 1];

          const isContinuation =
            idx > 0 &&
            prevMsg.senderId === msg.senderId &&
            formattedTime(prevMsg.sentDate) === currentTime &&
            !isNewDay;

          const showTime =
            !nextMsg ||
            nextMsg.senderId !== msg.senderId ||
            formattedTime(nextMsg.sentDate) !== currentTime;

          return (
            <React.Fragment key={`${msg.messageId}-${idx}`}>
              {/* 4. 날짜가 바뀌었을 때만 InfoBadge 노출 */}
              {isNewDay && (
                <div className="flex justify-center">
                  <InfoBadge>
                    <span className={"text-text-sub text-xs"}>{dateLabel}</span>
                  </InfoBadge>
                </div>
              )}

              <ChatMessage
                profileImage={msg.profileImage}
                username={msg.senderName}
                message={msg.content}
                time={currentTime}
                isMe={isMe}
                isContinuation={isContinuation}
                showTime={showTime}
              />
            </React.Fragment>
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
