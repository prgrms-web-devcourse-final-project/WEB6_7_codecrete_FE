"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trash2 } from "lucide-react";
import { Field, FieldLabel } from "@/components/ui/field";

type Role = "소유자" | "편집자" | "뷰어";
type Status = "joined" | "pending";

type Member = {
  id: string;
  name: string;
  role: Role;
  status: Status;
  avatar?: string;
};

const members: Member[] = [
  { id: "me", name: "You", role: "소유자", status: "joined", avatar: "/avatars/me.png" },
  { id: "1", name: "Jessica Park", role: "편집자", status: "joined" },
  { id: "2", name: "Tom Wilson", role: "뷰어", status: "joined" },
  { id: "3", name: "Alex Chen", role: "뷰어", status: "pending" },
  { id: "4", name: "Maria Garcia", role: "편집자", status: "pending" },
];

export function PlannerMembers() {
  const data = useMemo(() => members, []);

  return (
    <Field>
      <FieldLabel>멤버</FieldLabel>
      <div className="space-y-3">
        {data.map((m) => (
          <div
            key={m.id}
            className="bg-muted/40 flex items-center justify-between gap-4 rounded-2xl px-4 py-3"
          >
            <div className="flex items-center gap-4">
              <Avatar className="size-10">
                <AvatarImage src={m.avatar} alt={m.name} />
                <AvatarFallback>{m.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col gap-1">
                <strong className="text-sm font-medium">{m.name}</strong>
                <span className="text-text-sub text-xs">{m.role}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={m.status === "joined" ? "default" : "outline"}
                size="sm"
                disabled={m.status === "pending"}
              >
                {m.status === "joined" ? "참여" : "초대중"}
              </Button>
              <Button variant="ghost" size="icon" aria-label="삭제">
                <Trash2 className="size-5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Field>
  );
}
