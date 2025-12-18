import { Card, CardTitle } from "@/components/ui/card";
import { CircleCheck, CircleX } from "lucide-react";

const RULES = [
  {
    type: "allow",
    text: "모든 참여자를 존중해 주세요",
  },
  {
    type: "deny",
    text: "채팅방 내 티켓 판매는 금지되어 있습니다",
  },
  {
    type: "allow",
    text: "티켓 거래는 트랜스퍼 보드를 이용해 주세요",
  },
  {
    type: "deny",
    text: "개인정보는 공유하지 마세요",
  },
  {
    type: "allow",
    text: "공연과 관련된 이야기만 나눠주세요",
  },
  {
    type: "deny",
    text: "스팸 또는 홍보성 콘텐츠는 금지되어 있습니다",
  },
] as const;

export default function ChatRulesCard() {
  return (
    <Card className="gap-4 p-7">
      <CardTitle className="text-text-main text-xl font-bold">채팅방 이용 규칙</CardTitle>

      <ul className="flex flex-col gap-3">
        {RULES.map((rule, index) => (
          <RuleItem key={index} type={rule.type} text={rule.text} />
        ))}
      </ul>
    </Card>
  );
}

function RuleItem({ type, text }: { type: "allow" | "deny"; text: string }) {
  const Icon = type === "allow" ? CircleCheck : CircleX;

  return (
    <li className="flex items-center gap-3">
      <span className="inline-flex h-4 w-4 items-center">
        <Icon size={16} />
      </span>
      <span className="text-text-sub">{text}</span>
    </li>
  );
}
