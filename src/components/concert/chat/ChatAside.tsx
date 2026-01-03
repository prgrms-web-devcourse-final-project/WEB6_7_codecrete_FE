import ChatTimeCard from "@/components/concert/chat/ChatTimeCard";
import ConcertInfoCard from "@/components/concert/chat/ConcertInfoCard";
import ChatRulesCard from "@/components/concert/chat/ChatRulesCard";
import ActiveParticipantsCard from "@/components/concert/chat/ActiveParticipantsCard";
import { ConcertDetail, TicketOffice } from "@/types/concerts";
import { Client } from "@stomp/stompjs";

export default function ChatAside({
  concert,
  ticketOffices,
  stompClient,
}: {
  concert: ConcertDetail | null;
  ticketOffices: TicketOffice[] | null;
  stompClient: Client | null;
}) {
  return (
    <aside className="bg-bg-sub flex h-full max-w-130 flex-col gap-6 overflow-y-scroll p-10">
      <ChatTimeCard />
      <ConcertInfoCard concert={concert} ticketOffices={ticketOffices} />
      <ChatRulesCard />
      <ActiveParticipantsCard concertId={concert?.concertId} stompClient={stompClient} />
    </aside>
  );
}
