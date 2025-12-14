import { Card, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AuthorCard() {
  return (
    <Card className={"flex flex-col gap-4 p-6"}>
      <CardTitle>About the Author</CardTitle>
      <div className={"flex gap-4"}>
        <Avatar className={"h-16 w-16"}>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className={"flex flex-col justify-center gap-2"}>
          <span>Kim Ji-soo</span>
          <span className={"text-text-sub flex text-xs"}>jisoo1004@gmail.com</span>
        </div>
      </div>
    </Card>
  );
}
