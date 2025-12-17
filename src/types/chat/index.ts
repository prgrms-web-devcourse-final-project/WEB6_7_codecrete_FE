export type ChatMessageProps = {
  username: string;
  message: string;
  time: string;
  profileImage?: string;
  isMe?: boolean;
};

export type TicketVendor = "nol" | "ticketlink" | "melon";
