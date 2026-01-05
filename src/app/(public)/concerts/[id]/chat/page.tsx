// TODO: 모바일 환경에서 ChatAside를 토글/Drawer 형태로 전환

import ChatClient from "@/components/concert/chat/ChatClient";
import { getMe } from "@/lib/api/auth/auth.server";
import { getConcertDetail, getTicketOfficesByConcertId } from "@/lib/api/concerts/concerts.server";
import { redirect } from "next/navigation";

export default async function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let user = null;
  try {
    const userResponse = await getMe();
    user = userResponse.data; // GetMeResponse의 data 추출
  } catch {
    // 로그인이 안 되어 있다면 즉시 중단 및 이동
    redirect("/sign-in");
  }

  const [concert, ticketOffices] = await Promise.all([
    getConcertDetail({ concertId: id }),
    getTicketOfficesByConcertId({ concertId: id }),
  ]);

  return <ChatClient concert={concert} ticketOffices={ticketOffices} concertId={id} user={user} />;
}
