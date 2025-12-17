import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { twMerge } from "tailwind-merge";

export default function ChatMessage({
  profileImage = "https://github.com/shadcn.png",
  username,
  message,
  time,
  isMe = false,
}: ChatMessageProps) {
  return (
    <div className={twMerge("flex gap-3", isMe ? "flex-row-reverse" : "justify-start")}>
      <Avatar className={"h-10 w-10"}>
        <AvatarImage src={profileImage} alt="아바타 이미지" />
        <AvatarFallback>아바타 이미지</AvatarFallback>
      </Avatar>
      <div className={"flex flex-col gap-1"}>
        {!isMe && <span>{username}</span>}
        <div
          className={twMerge(
            "min-h-12 max-w-130 rounded-b-2xl px-4 py-3",
            isMe
              ? "bg-point-main text-text-point-main rounded-tl-2xl rounded-tr-xs"
              : "bg-text-point-sub text-text-main rounded-tl-xs rounded-tr-2xl"
          )}
        >
          {message}
        </div>
        <span className={twMerge("text-text-sub text-xs", isMe ? "text-end" : "")}>{time}</span>
      </div>
    </div>
  );
}
