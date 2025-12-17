"use client";

import { Card } from "@/components/ui/card";
import ChatAsideClock from "@/components/concert/chat/ChatAsideClock";
import TicketVendorSelector from "@/components/concert/chat/TicketVendorSelector";
import { useState } from "react";
import { TicketVendor } from "@/types/chat";

export default function ChatAside() {
  const [vendor, setVendor] = useState<TicketVendor>("nol");

  return (
    <aside className="bg-bg-sub flex max-w-400 flex-col p-10">
      <Card className={"p-7"}>
        <ChatAsideClock />
        <TicketVendorSelector value={vendor} onChange={setVendor} />
      </Card>
    </aside>
  );
}
