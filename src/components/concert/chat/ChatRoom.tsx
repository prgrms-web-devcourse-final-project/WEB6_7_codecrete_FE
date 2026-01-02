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

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const formatTime = (dateStr: string) =>
  new Date(dateStr).toLocaleTimeString("ko-KR", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

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
  const [isFetchingPast, setIsFetchingPast] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  // 마지막 메시지 ID를 추적하여 '새 메시지' 유입만 판별 (튕김 방지)
  const isAtBottomRef = useRef(true);

  const { ref: topTriggerRef, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const distance = container.scrollHeight - container.scrollTop - container.clientHeight;

      isAtBottomRef.current = distance < 150;
    };

    container.addEventListener("scroll", onScroll);
    onScroll(); // 초기값

    return () => {
      container.removeEventListener("scroll", onScroll);
    };
  }, []);

  /**
   * 1. 과거 메시지 페칭 (역방향 무한 스크롤)
   */
  const fetchPastMessages = useCallback(async () => {
    if (isFetchingPast || !hasMore || messages.length === 0) return;

    setIsFetchingPast(true);
    const container = containerRef.current;
    const prevScrollHeight = container?.scrollHeight || 0;

    try {
      const oldestMsgId = messages[0].messageId;
      const newData = await getChatMessages(concertId, oldestMsgId);

      if (newData.length < 20) setHasMore(false);

      if (newData.length > 0) {
        // 중복 제거 및 데이터 병합
        const existingIds = new Set(messages.map((m) => m.messageId));
        const uniqueNewData = newData.filter((m) => !existingIds.has(m.messageId));

        setMessages([...uniqueNewData, ...messages]);

        // 데이터 추가 후 스크롤 위치 보정
        requestAnimationFrame(() => {
          if (container) {
            container.scrollTop = container.scrollHeight - prevScrollHeight;
          }
        });
      }
    } catch {
      toast.error("과거 메시지를 불러오지 못했습니다.");
    } finally {
      setIsFetchingPast(false);
    }
  }, [isFetchingPast, hasMore, messages, concertId, setMessages]);

  // 천장 감지 시 페칭 실행
  useEffect(() => {
    if (inView && !isLoading && !isFetchingPast) {
      fetchPastMessages();
    }
  }, [inView, isLoading, isFetchingPast, fetchPastMessages]);

  /**
   * 2. 초기 데이터 페칭
   */
  useEffect(() => {
    let mounted = true;
    const initFetch = async () => {
      try {
        const data = await getChatMessages(concertId);
        if (mounted) {
          setMessages(data);
          setHasMore(data.length >= 20);
          setIsLoading(false);
        }
      } catch {
        toast.error("채팅 로드 실패");
      }
    };
    initFetch();
    return () => {
      mounted = false;
    };
  }, [concertId, setMessages]);

  /**
   * 3. 통합 스크롤 관리 로직
   */
  useEffect(() => {
    if (isLoading || messages.length === 0 || isFetchingPast) return;

    const container = containerRef.current;
    if (!container) return;

    if (isAtBottomRef.current) {
      requestAnimationFrame(() => {
        container.scrollTop = container.scrollHeight;
      });
    }
  }, [messages, isLoading, isFetchingPast]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !stompClient?.connected) return;

    stompClient.publish({
      destination: "/app/chat/send",
      body: JSON.stringify({
        concertId: Number(concertId),
        content: inputValue,
      }),
    });
    setInputValue("");
  };

  return (
    <section className="bg-bg-main flex flex-1 flex-col overflow-hidden border-r">
      {/* 상단 가이드라인 */}
      <div className="bg-bg-sub flex gap-3 border-b px-8 py-3">
        <Pin size={14} className="text-text-sub mt-1 fill-current" strokeWidth={1.5} />
        <div className="flex flex-col">
          <h3 className="font-bold">채팅 가이드라인</h3>
          <p className="text-text-sub text-xs">존중하는 대화 문화를 만들어주세요.</p>
        </div>
      </div>

      {/* 메시지 리스트 */}
      <div
        ref={containerRef}
        className="scrollbar-hide bg-bg-main flex flex-1 flex-col gap-6 overflow-y-scroll p-8"
      >
        {!isFetchingPast && <div ref={topTriggerRef} className="h-px w-full" />}

        {isFetchingPast && (
          <div className="flex justify-center py-2">
            <Loader2 className="text-text-sub h-4 w-4 animate-spin" />
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-text-sub animate-pulse text-sm">채팅을 불러오는 중입니다...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center py-20 opacity-60">
            <p className="text-text-main font-bold">아직 나눈 대화가 없어요.</p>
            <p className="text-text-sub mt-1 text-xs">첫 메시지를 보내보세요!</p>
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isMe = user?.id === msg.senderId;
            const currentDate = formatDate(msg.sentDate);
            const prevDate = idx > 0 ? formatDate(messages[idx - 1].sentDate) : null;
            const isNewDay = currentDate !== prevDate;
            const currentTime = formatTime(msg.sentDate);

            return (
              <div key={msg.messageId} className="flex flex-col gap-2">
                {isNewDay && (
                  <div className="my-4 flex justify-center">
                    <InfoBadge>
                      <span className="text-text-sub text-xs">{currentDate}</span>
                    </InfoBadge>
                  </div>
                )}
                <ChatMessage
                  profileImage={msg.profileImage}
                  username={msg.senderName}
                  message={msg.content}
                  time={currentTime}
                  isMe={isMe}
                  isContinuation={
                    idx > 0 &&
                    messages[idx - 1].senderId === msg.senderId &&
                    formatTime(messages[idx - 1].sentDate) === currentTime &&
                    !isNewDay
                  }
                  showTime={
                    !messages[idx + 1] ||
                    messages[idx + 1].senderId !== msg.senderId ||
                    formatTime(messages[idx + 1].sentDate) !== currentTime
                  }
                />
              </div>
            );
          })
        )}
      </div>

      {/* 입력 영역 */}
      <form onSubmit={handleSend} className="bg-bg-sub flex items-center gap-3 px-6 py-4">
        <Input
          className="bg-bg-main px-6 py-5 focus-visible:ring-1"
          placeholder="메시지를 입력하세요..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button size="lg" type="submit" disabled={!stompClient?.connected}>
          <Send className="mr-2 h-4 w-4" /> 전송
        </Button>
      </form>
    </section>
  );
}
