import ChatAsideClock from "@/components/concert/chat/ChatAsideClock";
import TicketVendorSelector from "@/components/concert/chat/TicketVendorSelector";
import { Card } from "@/components/ui/card";
import { TicketVendor } from "@/types/chat";
import { useState } from "react";

export default function ChatTimeCard() {
  const [vendor, setVendor] = useState<TicketVendor>("NOL");
  return (
    <Card className={"gap-8 p-7"}>
      <ChatAsideClock />
      <TicketVendorSelector value={vendor} onChange={setVendor} />
    </Card>
  );
}
