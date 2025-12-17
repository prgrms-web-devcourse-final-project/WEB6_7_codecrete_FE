import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Utensils } from "lucide-react";

export default function MeetingDetail() {
  const meetingInfoItems = [
    {
      icon: Calendar,
      label: "약속 시간",
      value: "April 15, 2025 · 5:00 PM",
    },
    {
      icon: MapPin,
      label: "약속 장소",
      value: "강남역 2번 출구",
    },
    {
      icon: Utensils,
      label: "희망 활동",
      value: "저녁 식사, 공연 관람, 뒷풀이",
    },
    {
      icon: Calendar,
      label: "기타 정보",
      value: "남성, 5명",
    },
  ];

  return (
    <Card className="flex flex-col gap-4 p-6">
      <CardTitle className="text-lg">만남 정보</CardTitle>

      {meetingInfoItems.map((item, index) => {
        const Icon = item.icon;

        return (
          <CardContent key={index}>
            <div className="text-text-sub flex items-center gap-2 text-sm">
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </div>
            <p className="px-6 text-sm">{item.value}</p>
          </CardContent>
        );
      })}
    </Card>
  );
}
