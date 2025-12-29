export type ChatMessageProps = {
  username: string;
  message: string;
  time: string;
  profileImage?: string;
  isMe?: boolean;
};

export type TicketVendor = "nol" | "ticketlink" | "melon";

export type ChatResponse = {
  status: number;
  resultCode: string;
  msg: string;
  data: string;
};
