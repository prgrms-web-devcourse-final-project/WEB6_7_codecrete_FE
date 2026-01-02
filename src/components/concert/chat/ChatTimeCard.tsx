import ChatAsideClock from "@/components/concert/chat/ChatAsideClock";
import TicketVendorSelector from "@/components/concert/chat/TicketVendorSelector";
import { Card } from "@/components/ui/card";
import { TicketVendor } from "@/types/chat";
import { useEffect, useState } from "react";
import { getServerTimeOffset } from "@/lib/api/chat/chat.client";

export default function ChatTimeCard() {
  const [vendor, setVendor] = useState<TicketVendor>("NOL");
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    let mounted = true;

    const fetchOffset = async () => {
      try {
        const offsetMillis = await getServerTimeOffset(vendor);
        if (mounted) setOffset(offsetMillis);
      } catch (e) {
        console.error(e);
      }
    };

    fetchOffset();

    return () => {
      mounted = false;
    };
  }, [vendor]);
  return (
    <Card className={"gap-8 p-7"}>
      <ChatAsideClock offsetMillis={offset} />
      <TicketVendorSelector value={vendor} onChange={setVendor} />
    </Card>
  );
}
