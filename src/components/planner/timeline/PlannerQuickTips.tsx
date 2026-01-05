"use client";

import { GlassWaterIcon, Lightbulb, ShirtIcon, TicketsIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface QuickTip {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const tips: QuickTip[] = [
  {
    icon: <Lightbulb className="size-5" />,
    title: "휴대폰 충전하기",
    description: "사진과 영상을 찍기 위해 배터리를 충전하고 가세요",
  },
  {
    icon: <TicketsIcon className="size-5" />,
    title: "티켓 다운로드",
    description: "오프라인 복사본을 위해 티켓을 미리 다운로드하세요",
  },
  {
    icon: <ShirtIcon className="size-5" />,
    title: "편하게 입기",
    description: "편한 신발을 신고 편한 옷을 입으세요",
  },
  {
    icon: <GlassWaterIcon className="size-5" />,
    title: "수분 섭취",
    description: "계속 움직이므로 수분을 충분히 마세요",
  },
];

export default function PlannerQuickTips() {
  return (
    <section className="space-y-4">
      <h3 className="text-text-main text-xl font-bold">콘서트 당일 팁</h3>
      <div className="grid grid-cols-2 gap-4">
        {tips.map((tip, idx) => (
          <Card key={idx} className="border-border bg-bg-sub flex-row items-center p-4">
            <div className="bg-point-main text-text-point-main flex size-10 items-center justify-center rounded-full">
              {tip.icon}
            </div>
            <div className="space-y-1">
              <h4 className="text-text-main text-sm font-semibold">{tip.title}</h4>
              <p className="text-text-sub text-xs">{tip.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
