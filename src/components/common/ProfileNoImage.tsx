import { User2Icon } from "lucide-react";
import { twMerge } from "tailwind-merge";

const sizeClass = {
  xs: "size-8",
  sm: "size-10",
  md: "size-20",
  lg: "size-30",
};
const iconClass = {
  xs: "-bottom-1 size-8",
  sm: "-bottom-2 size-10",
  md: "-bottom-2 size-20",
  lg: "-bottom-4 size-30",
};

export default function ProfileNoImage({ size = "md", alt }: { size?: string; alt?: string }) {
  return (
    <div
      className={twMerge(
        "relative overflow-hidden rounded-full bg-zinc-100",
        sizeClass[size as keyof typeof sizeClass]
      )}
      aria-label={alt}
      role="img"
    >
      <User2Icon
        className={twMerge(
          "absolute left-1/2 -translate-x-1/2 fill-zinc-300 stroke-zinc-300",
          iconClass[size as keyof typeof iconClass]
        )}
      />
    </div>
  );
}
