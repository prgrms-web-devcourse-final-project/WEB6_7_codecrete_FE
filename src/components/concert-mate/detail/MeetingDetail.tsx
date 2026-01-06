import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { MateDetailData } from "@/types/community/concert-mate";
import { Calendar, MapPin, Utensils } from "lucide-react";

export default function MeetingDetail({ res }: { res: MateDetailData }) {
  const meetingInfoItems = [
    {
      icon: Calendar,
      label: "약속 시간",
      value: res.meetingAt,
    },
    {
      icon: MapPin,
      label: "약속 장소",
      value: res.meetingPlace,
    },
    {
      icon: Utensils,
      label: "희망 활동",
      value: res.activityTags?.join(", ") || "-",
    },
  ].filter((item) => item.value);

  let genderText = "";
  if (res.genderPreference === "ANY") genderText = "성별무관";
  if (res.genderPreference === "MALE") genderText = "남성";
  if (res.genderPreference === "FEMALE") genderText = "여성";

  const additionalInfo = [
    { label: "희망 인원", value: `${res.maxParticipants}명` },
    {
      label: "희망 연령대",
      value: res.ageRangeMin && res.ageRangeMax ? `${res.ageRangeMin}~${res.ageRangeMax}세` : "-",
    },
    { label: "성별", value: genderText || "-" },
  ];
  return (
    <Card className="flex flex-col gap-4 p-6">
      <CardTitle className="text-lg">만남 정보</CardTitle>

      {/* 만남 정보 */}
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

      {/* 기타 정보 */}
      <CardContent>
        <div className="text-sm">
          <div className="text-text-sub mb-2 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>기타 정보</span>
          </div>
          <div className="text-text-main flex flex-wrap gap-4">
            {additionalInfo.map((info, index) => (
              <p key={index} className="px-6 text-sm">
                {info.label}: {info.value}
              </p>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
