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
      messages: [],

      setMessages: (msgs) =>
        set((state) => {
          state.messages = [...msgs].sort((a, b) => a.messageId.localeCompare(b.messageId));
        }),

      addMessage: (msg) =>
        set((state) => {
          state.messages.push(msg);
        }),
    }))
  )
);
