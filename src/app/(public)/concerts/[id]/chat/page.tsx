// TODO: 모바일 환경에서 ChatAside를 토글/Drawer 형태로 전환

import ChatClient from "@/components/concert/chat/ChatClient";
import { getConcertDetail, getTicketOfficesByConcertId } from "@/lib/api/concerts";

export default async function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const concert = await getConcertDetail({ concertId: id });
  const ticketOffices = await getTicketOfficesByConcertId({ concertId: id });

  return <ChatClient concert={concert} ticketOffices={ticketOffices} />;
}
