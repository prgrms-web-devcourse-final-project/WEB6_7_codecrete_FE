import ClientApi from "@/utils/helpers/clientApi";
import { ChatMessageData, ChatResponse, TicketVendor, TicketVendorResponse } from "@/types/chat";

// 채팅방 입장 함수
export async function joinChatRoom(concertId: number) {
  try {
    const res = await ClientApi(`/api/v1/chat-room/concert/${concertId}/join`, { method: "POST" });

    let json: ChatResponse | null = null;

    try {
      json = await res.json();
    } catch {}

    if (!res.ok) {
      const message = json?.msg ?? "채팅방 입장에 실패했습니다.";
      throw new Error(message);
    }

    return json?.msg ?? "채팅방에 입장했습니다.";
  } catch (e) {
    // 네트워크 에러 (Failed to fetch)
    if (e instanceof TypeError) {
      throw new Error("서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.");
    }

    // 내가 던진 Error는 그대로 전달
    if (e instanceof Error) {
      throw e;
    }

    // 정말 예외적인 케이스
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}

// 채팅 메시지 조회
export async function getChatMessages(
  concertId: string,
  before?: string,
  size: number = 20
): Promise<ChatMessageData[]> {
  try {
    const params = new URLSearchParams();
    if (before) params.append("before", before);
    params.append("size", size.toString());

    const res = await ClientApi(`/api/v1/chats/${concertId}/messages?${params.toString()}`);

    let json: ChatResponse | null = null;

    try {
      json = await res.json();
    } catch {
      throw new Error("서버 응답을 처리할 수 없습니다.");
    }

    if (!res.ok) {
      const message = json?.msg ?? "채팅 메시지 조회에 실패했습니다.";
      throw new Error(message);
    }

    return json?.data ?? [];
  } catch (e) {
    // 네트워크 에러 (Failed to fetch)
    if (e instanceof TypeError) {
      throw new Error("서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.");
    }

    // 내가 던진 Error는 그대로 전달
    if (e instanceof Error) {
      throw e;
    }

    // 정말 예외적인 케이스
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}

export async function getServerTimeOffset(vendor: TicketVendor): Promise<number> {
  try {
    const res = await ClientApi(`/api/v1/server-time/${vendor}`);

    let json: TicketVendorResponse | null = null;

    try {
      json = await res.json();
    } catch {
      throw new Error("서버 응답을 처리할 수 없습니다.");
    }

    if (!res.ok) {
      const message = json?.msg ?? "서버 시간을 불러오지 못했습니다.";
      throw new Error(message);
    }

    return json?.data?.offsetMillis ?? 0;
  } catch (e) {
    if (e instanceof TypeError) {
      throw new Error("서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.");
    }

    if (e instanceof Error) {
      throw e;
    }

    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}
