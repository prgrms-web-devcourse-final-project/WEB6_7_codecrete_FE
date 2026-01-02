// TODO:
// - 사용자의 입장/퇴장 이벤트를 시스템 메시지로 구분하여 렌더링
//   (ex. "OOO님이 입장했습니다", "OOO님이 퇴장했습니다")

import { Loader2, Pin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { getChatMessages } from "@/lib/api/chat/chat.client";
import { useChatStore } from "@/stores/useChatStore";
import { Client } from "@stomp/stompjs";
import { toast } from "sonner";
import { User } from "@/types/user";
import ChatMessage from "@/components/concert/chat/ChatMessage";
import InfoBadge from "@/components/concert/chat/InfoBadge";
import { useInView } from "react-intersection-observer";

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
  const [isFetchingPast, setIsFetchingPast] = useState(false); // 과거 데이터 로딩 상태
  const [hasMore, setHasMore] = useState(true); // 추가 데이터 여부
  const [inputValue, setInputValue] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  const { ref: topTriggerRef, inView } = useInView({ threshold: 0 });

  const fetchPastMessages = useCallback(async () => {
    if (isFetchingPast || !hasMore || messages.length === 0) return;

    setIsFetchingPast(true);
    const container = containerRef.current;

    // 데이터 추가 전의 전체 높이 저장
    const prevScrollHeight = container?.scrollHeight || 0;

    try {
      // 현재 리스트의 가장 첫 번째(가장 오래된) 메시지 ID를 커서로 사용
      const oldestMsgId = messages[0].messageId;
      const newData = await getChatMessages(concertId, oldestMsgId);

      if (newData.length < 20) {
        setHasMore(false); // 가져온 데이터가 요청 사이즈(20)보다 적으면 끝에 도달
      }

      if (newData.length > 0) {
        // 기존 메시지 앞에 새 데이터를 병합
        setMessages([...newData, ...messages]);

        // 3. 스크롤 위치 보정 (핵심 로직)
        // DOM이 업데이트된 직후 높이 차이만큼 scrollTop을 조절합니다.
        requestAnimationFrame(() => {
          if (container) {
            const newScrollHeight = container.scrollHeight;
            container.scrollTop = newScrollHeight - prevScrollHeight;
          }
        });
      }
    } catch {
      toast.error("과거 메시지를 불러오지 못했습니다.");
    } finally {
      setIsFetchingPast(false);
    }
  }, [isFetchingPast, hasMore, messages, concertId, setMessages]);

  useEffect(() => {
    if (inView && !isLoading) {
      fetchPastMessages();
    }
  }, [inView, isLoading, fetchPastMessages]);

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
    let mounted = true;
    const fetchInitialMessages = async () => {
      try {
        const data = await getChatMessages(concertId);
        if (mounted) {
          setMessages(data);
          setHasMore(data.length >= 20);
          setIsLoading(false);
        }
      } catch {
        toast.error("메시지 로드 실패");
      }
    };
    fetchInitialMessages();
    return () => {
      mounted = false;
    };
  }, [concertId, setMessages]);

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
        {/* 4. 무한 스크롤 감지 센서 */}
        <div ref={topTriggerRef} className="h-1 w-full" />

        {isFetchingPast && (
          <div className="flex justify-center py-2">
            <Loader2 className="text-text-sub h-4 w-4 animate-spin" />
          </div>
        )}

        {/* 5. 채팅이 없는 경우 (Empty State) */}
        {!isLoading && messages.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center py-20 text-center opacity-60">
            <p className="text-text-main font-bold">아직 나눈 대화가 없어요.</p>
            <p className="text-text-sub mt-1 text-xs">첫 번째 메시지를 보내보세요!</p>
          </div>
        )}

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
