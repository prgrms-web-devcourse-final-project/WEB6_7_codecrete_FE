import { create } from "zustand"; // 경로 수정
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { ChatMessageData } from "@/types/chat";

interface ChatState {
  messages: ChatMessageData[];
  setMessages: (msgs: ChatMessageData[]) => void;
  addMessage: (msg: ChatMessageData) => void;
}

export const useChatStore = create<ChatState>()(
  devtools(
    immer((set) => ({
      messages: [], // 오타 수정 (message -> messages)

      setMessages: (msgs) =>
        set((state) => {
          state.messages = msgs; // immer 덕분에 직접 할당 가능
        }),

      addMessage: (msg) =>
        set((state) => {
          state.messages.push(msg); // immer 덕분에 push 사용 가능
        }),
    }))
  )
);
