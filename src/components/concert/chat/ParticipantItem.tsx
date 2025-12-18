import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Item } from "@/components/ui/item";

export default function ParticipantItem({
  name,
  statusText,
  online,
  imageUrl = "https://github.com/shadcn.png",
}: {
  name: string;
  statusText: string;
  online: boolean;
  imageUrl?: string;
}) {
  return (
    <Item className="flex gap-3 p-0">
      <Avatar>
        <AvatarImage src={imageUrl} />
        <AvatarFallback>{name ? name[0] : "?"}</AvatarFallback>
      </Avatar>

      <div className="flex flex-1 flex-col">
        <span>{name}</span>
        <span className="text-text-sub text-xs">{statusText}</span>
      </div>

      <div className="flex items-center">
        <span className={`h-2 w-2 rounded-full ${online ? "bg-green-500" : "bg-text-sub"}`} />
      </div>
    </Item>
  );
}
