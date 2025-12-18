import ChatAsideClock from "@/components/concert/chat/ChatAsideClock";
import TicketVendorSelector from "@/components/concert/chat/TicketVendorSelector";
import { Card } from "@/components/ui/card";
import { TicketVendor } from "@/types/chat";

export default function ChatTimeCard({
  vendor,
  setVendor,
}: {
  vendor: string;
  setVendor: (value: TicketVendor) => void;
}) {
  return (
    <Card className={"gap-8 p-7"}>
      <ChatAsideClock />
      <TicketVendorSelector value={vendor} onChange={setVendor} />
    </Card>
  );
}
