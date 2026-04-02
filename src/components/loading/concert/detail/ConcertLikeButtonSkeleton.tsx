import { Button } from "@/components/ui/button";
import { HeartIcon } from "lucide-react";

export default function ConcertLikeButtonSkeleton() {
  return (
    <Button variant="outline" size="icon" className="border-border hover:bg-border group">
      <HeartIcon className="stroke-accent fill-accent h-4 w-4 animate-pulse" />
    </Button>
  );
}
