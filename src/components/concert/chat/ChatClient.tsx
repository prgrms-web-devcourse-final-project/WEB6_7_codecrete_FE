"use client";

import { ConcertDetail, TicketOffice } from "@/types/concerts";
import ChatHeader from "@/components/concert/chat/ChatHeader";
import ChatRoom from "@/components/concert/chat/ChatRoom";
import ChatAside from "@/components/concert/chat/ChatAside";
import { useChatStore } from "@/stores/useChatStore";
import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import { toast } from "sonner";
import { User } from "@/types/user";

export default function ChatClient({
  concert,
  ticketOffices,
  concertId,
  user,
}: {
  concert: ConcertDetail | null;
  ticketOffices: TicketOffice[] | null;
  concertId: string;
  user: User | null;
}) {
  const { addMessage } = useChatStore();
  const stompClientRef = useRef<Client | null>(null);

  const [activeClient, setActiveClient] = useState<Client | null>(null);

  useEffect(() => {
    // 1. STOMP 클라이언트 설정
    const client = new Client({
      brokerURL: process.env.NEXT_PUBLIC_WS_URL, // 서버 웹소켓 엔드포인트
      reconnectDelay: 5000,
      connectionTimeout: 10000,

      onConnect: () => {
        // 2. 메시지 수신을 위한 구독

        setActiveClient(client);

        client.subscribe(`/topic/chat/${concertId}`, (message) => {
          const newMessage = JSON.parse(message.body);
          addMessage(newMessage); // 실시간 메시지를 스토어에 추가
        });
      },
      onDisconnect: () => {
        setActiveClient(null);
      },

      onStompError: (frame) => {
        console.error("STOMP 프로토콜 오류:", frame.headers["message"]);
        toast.error("채팅 서버 내부 오류가 발생했습니다.");
      },

      onWebSocketError: (event) => {
        console.error("웹소켓 연결 실패:", event);
        toast.error("서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.");
      },

      onWebSocketClose: () => {
        setActiveClient(null);
        console.warn("웹소켓 연결이 종료되었습니다.");
      },
    });

    client.activate(); // 연결 시작
    stompClientRef.current = client;

    return () => {
      client.deactivate(); // 컴포넌트 언마운트 시 연결 해제
    };
  }, [concertId, addMessage]);

  return (
    <>
      <ChatHeader concert={concert} />
      <div className="border-border bg-bg-main flex h-[calc(100dvh-92px)] overflow-hidden border-t">
        <ChatRoom concertId={concertId} stompClient={activeClient} user={user} />
        <ChatAside concert={concert} ticketOffices={ticketOffices} />
      </div>
    </>
  );
}
