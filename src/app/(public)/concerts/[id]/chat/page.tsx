import ChatHeader from "@/components/concert/chat/ChatHeader";
import ChatRoom from "@/components/concert/chat/ChatRoom";

export default function ChatPage() {
  return (
    <>
      <ChatHeader />
      <div className="border-border flex min-h-screen border-t">
        <ChatRoom />
        <aside className="bg-bg-sub flex max-w-400 flex-col p-10">어사이드</aside>
      </div>
    </>
  );
}
