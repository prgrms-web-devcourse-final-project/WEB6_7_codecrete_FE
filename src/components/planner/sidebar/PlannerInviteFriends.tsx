import ProfileNoImage from "@/components/common/ProfileNoImage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PlannerParticipant } from "@/types/planner";

export default function PlannerInviteFriends({
  participants,
}: {
  participants: PlannerParticipant[];
}) {
  return (
    <div className="bg-bg-main border-border lg:border lg:p-6">
      <h4 className="text-base font-bold">동행메이트</h4>
      <ul className="space-y-3">
        {participants.map((participant) => (
          <li
            key={participant.participantId}
            className="bg-bg-sub flex items-center gap-3 rounded-xl p-4"
          >
            <Avatar className="size-10 ring-0">
              <AvatarImage src={participant.profileImage} alt={participant.nickname} />
              <AvatarFallback>
                <ProfileNoImage size="sm" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <strong className="line-clamp-1 text-sm font-medium">{participant.nickname}</strong>
              <Badge variant="outline" className="text-xs">
                {participant.role}
              </Badge>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
