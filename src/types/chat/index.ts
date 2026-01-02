export type TicketVendor = "NOL" | "YES24" | "MELON" | "TICKETLINK";

export type ApiResponse<T> = {
  status: number;
  resultCode: string;
  msg: string;
  data: T;
};

export type TicketVendorResponse = ApiResponse<TicketVendorData>;
export type ChatResponse = ApiResponse<ChatMessageData[]>;

export type ChatMessageData = {
  messageId: string;
  concertId: number;
  senderId: number;
  senderName: string;
  content: string;
  sentDate: string;
  profileImage?: string;
};

export type ChatMessageProps = {
  profileImage?: string;
  username: string;
  message: string;
  time: string;
  isMe: boolean;
  isContinuation: boolean;
  showTime: boolean;
};

export type TicketVendorData = {
  provider: TicketVendor;
  offsetMillis: number;
};
