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
      className={"lg:w-auto! lg:px-4!"}
      disabled={disabled}
      size={"icon"}
    >
      <Heart className={twMerge(isLiked ? "fill-current" : "fill-none")} />{" "}
      <span className={"hidden lg:block"}>{isLiked ? "언팔로우" : "팔로우"}</span>
    </Button>
  );
}
