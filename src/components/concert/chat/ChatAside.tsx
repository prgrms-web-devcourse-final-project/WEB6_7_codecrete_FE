// TODO: 모바일 환경에서는 ChatAside를 Drawer/BottomSheet 형태로 전환
"use client";

import { useState } from "react";
import { TicketVendor } from "@/types/chat";
import ChatTimeCard from "@/components/concert/chat/ChatTimeCard";
import ConcertInfoCard from "@/components/concert/chat/ConcertInfoCard";
import ChatRulesCard from "@/components/concert/chat/ChatRulesCard";
import ActiveParticipantsCard from "@/components/concert/chat/ActiveParticipantsCard";
import { ConcertDetail, TicketOffice } from "@/types/concerts";

export default function ChatAside({
  concert,
  ticketOffices,
}: {
  concert: ConcertDetail | null;
  ticketOffices: TicketOffice[] | null;
}) {
  const [vendor, setVendor] = useState<TicketVendor>("nol");

  return (
    <aside className="bg-bg-sub flex h-full max-w-130 flex-col gap-6 overflow-y-scroll p-10">
      <ChatTimeCard vendor={vendor} setVendor={setVendor} />
      <ConcertInfoCard concert={concert} ticketOffices={ticketOffices} />
      <ChatRulesCard />
      <ActiveParticipantsCard />
    </aside>
  );
}
