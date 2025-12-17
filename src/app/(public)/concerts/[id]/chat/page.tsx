"use client";

import ChatHeader from "@/components/concert/chat/ChatHeader";
import { Pin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InfoBadge from "@/components/concert/chat/InfoBadge";

export default function ChatPage() {
  return (
    <div className="border-border mx-auto flex h-screen min-h-0 max-w-400 flex-col border-x">
      <ChatHeader />
      <div className="border-border flex min-h-screen border-t">
        {/*채팅 영역*/}
        <section className="bg-bg-main flex flex-1 flex-col border-r">
          <div className={"bg-bg-sub flex gap-3 border-b px-8 py-3"}>
            <Pin size={14} className="text-text-sub mt-1 fill-current" strokeWidth={1.5} />
            <div className={"flex flex-col"}>
              <h3>Chat Guidelines</h3>
              <p className={"text-text-sub text-xs"}>
                Please do not share ticket screenshots or personal information. Use the Transfer
                Board for ticket trades. Be respectful to all participants.
              </p>
            </div>
          </div>
          <div className={"bg-bg-main flex flex-1 flex-col gap-6 overflow-y-auto border-b p-8"}>
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
        <aside className="bg-bg-sub flex max-w-400 flex-col p-10">어사이드</aside>
      </div>
    </div>
  );
}
