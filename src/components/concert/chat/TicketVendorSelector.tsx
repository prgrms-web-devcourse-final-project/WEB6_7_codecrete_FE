/**
 * TODO: 구매처별 데이터 연동
 *
 * - 현재는 구매처(Radio) 선택 UI만 제공
 * - 실제 티켓 데이터는 아직 백엔드에서 전달되지 않음
 *
 * 추후 구현 방향:
 * 1. 구매처 선택 값(vendor)을 기준으로
 *    - 'nol' | 'ticketlink' | 'melon'
 *
 * 2. 백엔드에서 구매처별 티켓/오픈 시간 데이터를
 *    공통 포맷으로 내려줄 경우 연동
 *
 * 3. 만약 백엔드 연동이 불가할 경우:
 *    - 프론트에서는 더미 데이터로 UI만 유지
 *    - 구매처별 분기는 UI 상태 표현 용도로만 사용
 *
 * 4. 현재 단계에서는 퍼블리싱 목적이므로
 *    - 실제 데이터 fetch 로직은 구현하지 않음
 *    - 구조 및 타입만 유지
 */

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
  value: string;
  onChange: (value: TicketVendor) => void;
}) {
  return (
    <div className="border-t pt-4">
      <RadioGroup value={value} onValueChange={onChange}>
        <VendorItem value="nol" id="r1" label="NOL 티켓" />
        <VendorItem value="ticketlink" id="r2" label="티켓 링크" />
        <VendorItem value="melon" id="r3" label="멜론 티켓" />
      </RadioGroup>
    </div>
  );
}
