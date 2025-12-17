import { Pin, Send } from "lucide-react";
import InfoBadge from "@/components/concert/chat/InfoBadge";
import ChatMessage from "@/components/concert/chat/ChatMessage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChatRoom() {
  return (
    <section className="bg-bg-main flex flex-1 flex-col border-r">
      <div className={"bg-bg-sub flex gap-3 border-b px-8 py-3"}>
        <Pin size={14} className="text-text-sub mt-1 fill-current" strokeWidth={1.5} />
        <div className={"flex flex-col"}>
          <h3>Chat Guidelines</h3>
          <p className={"text-text-sub text-xs"}>
            Please do not share ticket screenshots or personal information. Use the Transfer Board
            for ticket trades. Be respectful to all participants.
          </p>
        </div>
      </div>
      <div className={"bg-bg-main flex flex-1 flex-col gap-6 border-b p-8"}>
        <div className={"flex justify-center"}>
          <InfoBadge>
            <span className={"text-text-sub"}>Today - December 8, 2025</span>
          </InfoBadge>
        </div>
        <div className={"flex justify-center"}>
          <span className={"text-text-sub"}>User_8472 joined the room</span>
        </div>
        <div className={"flex justify-center"}>
          <span className={"text-text-sub"}>User_8472 joined the room</span>
        </div>
        <ChatMessage message={"헬로우"} username={"진환"} time={"10:19"} />
        <ChatMessage message={"안녕하세요"} username={"민주"} time={"10:19"} isMe={true} />
        <ChatMessage message={"지금 뭐하세요?"} username={"민주"} time={"10:19"} isMe={true} />
        <ChatMessage message={"지금 운동중입니다"} username={"진환"} time={"10:25"} />
        <ChatMessage
          message={"이야 열심히 하시네요"}
          username={"민주"}
          time={"10:30"}
          isMe={true}
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={"bg-bg-sub flex items-center gap-3 px-6 py-4"}
      >
        <Input className={"bg-bg-main px-6 py-5"} placeholder={"채팅을 입력하세요."} />
        <Button className={"flex h-full gap-2"} size={"lg"} type={"submit"}>
          <Send className={"fill-current"} />
          Send
        </Button>
      </form>
    </section>
  );
}
