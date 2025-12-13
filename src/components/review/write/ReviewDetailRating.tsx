import { Star } from "lucide-react";
import { CardDescription } from "@/components/ui/card";

export default function ReviewDetailRating({ title }: { title: string }) {
  return (
    <CardDescription className={"flex justify-between"}>
      <p>{title}</p>
      <div className={"text-text-main flex"}>
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </div>
    </CardDescription>
  );
}
