import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { twMerge } from "tailwind-merge";
import { ChatMessageProps } from "@/types/chat";

export default function ChatMessage({
  profileImage = "https://github.com/shadcn.png",
  username,
  message,
  time,
  isMe = false,
  isContinuation = false,
  showTime = true,
}: ChatMessageProps) {
  return (
    <div
      className={twMerge(
        "flex gap-3",
        isMe ? "flex-row-reverse" : "justify-start",
        isContinuation ? "-mt-3" : "mt-0"
      )}
    >
      <Avatar className={twMerge("h-10 w-10", isContinuation ? "opacity-0" : "opacity-100")}>
        <AvatarImage src={profileImage} alt="아바타 이미지" />
        <AvatarFallback>{username?.[0]}</AvatarFallback>
      </Avatar>
      <div className={twMerge("flex flex-col gap-1", isMe ? "items-end" : "items-start")}>
        {!isMe && !isContinuation && (
          <span className="text-text-main text-xs font-semibold">{username}</span>
        )}

        <div
          className={twMerge(
            "min-h-12 w-fit max-w-130 rounded-b-2xl px-4 py-3",
            isMe
              ? "bg-point-main text-text-point-main rounded-tl-2xl rounded-tr-xs"
              : "bg-text-point-sub text-text-main rounded-tl-xs rounded-tr-2xl"
          )}
        >
          {message}
        </div>

        {showTime && (
          <span className={twMerge("text-text-sub text-xs", isMe ? "text-end" : "")}>{time}</span>
        )}
      </div>
    </div>
  );
}
