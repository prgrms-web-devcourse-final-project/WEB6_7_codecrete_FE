"use client";
// TODO: 모바일 환경에서 ChatAside를 토글/Drawer 형태로 전환

import ChatHeader from "@/components/concert/chat/ChatHeader";
import ChatRoom from "@/components/concert/chat/ChatRoom";
import ChatAside from "@/components/concert/chat/ChatAside";
import { useParams } from "next/dist/client/components/navigation";

export default function ChatPage() {
  const params = useParams();
  const concertId = params?.id ? Number(params.id) : null;

  return (
    <>
      {console.error(concertId)}
      <ChatHeader />
      <div className="border-border bg-bg-main flex h-[calc(100dvh-92px)] overflow-hidden border-t">
        <ChatRoom />
        <ChatAside />
      </div>
    </>
  );
}
