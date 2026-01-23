import { Car, PersonStanding, Bus, ArrowDown } from "lucide-react";

interface TransportBlockProps {
  from: {
    name: string;
    time: string;
  };
  to: {
    name: string;
    time: string;
  };
  duration: number; // 분 단위
  distance: number; // km
  method: "WALK" | "CAR" | "PUBLIC_TRANSPORT";
}

export function TransportBlock({ from, to, duration, distance, method }: TransportBlockProps) {
  const config = {
    WALK: {
      icon: PersonStanding,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-400",
      label: "도보",
    },
    CAR: {
      icon: Car,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-400",
      label: "자동차",
    },
    PUBLIC_TRANSPORT: {
      icon: Bus,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-400",
      label: "대중교통",
    },
  };

  const { icon: Icon, color, bg, border, label } = config[method];

  return (
    <div
      className={`relative flex items-center gap-3 px-4 py-3 ${bg} rounded-lg border-l-4 ${border}`}
    >
      {/* 왼쪽: 시간 */}
      <div className="text-muted-foreground flex w-16 flex-col items-center justify-center text-xs">
        <span>{from.time}</span>
        <ArrowDown className="my-1 h-3 w-3" />
        <span>{to.time}</span>
      </div>

      {/* 중앙: 이동 정보 */}
      <div className="flex flex-1 items-center gap-3">
        <div className={`rounded-full p-2 ${bg} ${color}`}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-foreground text-sm font-medium">
            {from.name} → {to.name}
          </span>
          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            <span>{label}</span>
            <span>•</span>
            <span>{duration}분</span>
            <span>•</span>
            <span>{distance.toFixed(1)}km</span>
          </div>
        </div>
      </div>

      {/* 오른쪽: 자동 생성 뱃지 */}
      <div className={`px-2 py-1 text-xs ${bg} ${color} rounded border ${border}`}>자동</div>
    </div>
  );
}
