// TODO: 모바일 환경에서 ChatAside를 토글/Drawer 형태로 전환

import ChatHeader from "@/components/concert/chat/ChatHeader";
import ChatRoom from "@/components/concert/chat/ChatRoom";
import ChatAside from "@/components/concert/chat/ChatAside";

export default function ChatPage() {
  return (
    <>
      <ChatHeader />
      <div className="border-border flex min-h-screen border-t">
        <ChatRoom />
        <ChatAside />
      </div>
    </>
  );
}
