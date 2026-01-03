import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { TicketVendor } from "@/types/chat";

function VendorItem({ value, id, label }: { value: string; id: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <RadioGroupItem value={value} id={id} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
}

export default function TicketVendorSelector({
  value,
  onChange,
}: {
  value: TicketVendor;
  onChange: (value: TicketVendor) => void;
}) {
  return (
    <div className="border-t pt-4">
      <RadioGroup value={value} onValueChange={onChange}>
        <VendorItem value="NOL" id="r1" label="NOL 티켓" />
        <VendorItem value="YES24" id="r2" label="예스24 티켓" />
        <VendorItem value="MELON" id="r3" label="멜론 티켓" />
        <VendorItem value="TICKETLINK" id="r4" label="티켓 링크" />
      </RadioGroup>
    </div>
  );
}
