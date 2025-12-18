// TODO: vendor 상태를 상위(ChatPage)로 끌어올려
//  채팅/시간/예매처 관련 로직을 페이지 단에서 통합 관리

// TODO: 모바일 환경에서는 ChatAside를 Drawer/BottomSheet 형태로 전환

"use client";

import { useState } from "react";
import { TicketVendor } from "@/types/chat";
import ChatTimeCard from "@/components/concert/chat/ChatTimeCard";
import ConcertInfoCard from "@/components/concert/chat/ConcertInfoCard";
import ChatRulesCard from "@/components/concert/chat/ChatRulesCard";
import ActiveParticipantsCard from "@/components/concert/chat/ActiveParticipantsCard";

export default function ChatAside() {
  const [vendor, setVendor] = useState<TicketVendor>("nol");

  return (
    <aside className="bg-bg-sub flex max-w-400 flex-col gap-6 p-10">
      <ChatTimeCard vendor={vendor} setVendor={setVendor} />
      <ConcertInfoCard />
      <ChatRulesCard />
      <ActiveParticipantsCard />
    </aside>
  );
}
