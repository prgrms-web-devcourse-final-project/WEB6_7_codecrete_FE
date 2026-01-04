import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";

type FollowButtonProps = {
  isLiked: boolean;
  disabled?: boolean;
  onClick: () => void;
};

export default function FollowButton({ isLiked, disabled, onClick }: FollowButtonProps) {
  return (
    <Button
      type={"button"}
      onClick={onClick}
      className={"text-base"}
      disabled={disabled}
      size={"lg"}
    >
      <Heart className={twMerge(isLiked ? "fill-current" : "fill-none")} />{" "}
      <span>{isLiked ? "언팔로우" : "팔로우"}</span>
    </Button>
  );
}
