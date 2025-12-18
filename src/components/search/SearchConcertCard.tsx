import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { twMerge } from "tailwind-merge";
import { Calendar, Clock, Heart, MapPin, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SearchConcertCard() {
  return (
    <Card className="flex flex-row gap-6">
      <div className="relative shrink-0 pl-6">
        <Image
          src="/ConcertPoster.png"
          alt="Concert Poster"
          width={192}
          height={192}
          className="aspect-square rounded-lg"
        />
        <Badge
          className={twMerge(
            `bg-point-main text-text-point-main absolute bottom-3 left-8 mr-2 text-sm`
          )}
        >
          Rock
        </Badge>
      </div>
      <CardContent className="flex flex-1 justify-between">
        <div className="flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl">2025 Christmas Concert</h2>
            <div className="flex gap-3">
              <div className={twMerge(`text-text-sub flex items-center gap-1 text-sm`)}>
                <Calendar className="h-4 w-4" />
                2025년 12월 24일
              </div>
              <div className={twMerge(`text-text-sub flex items-center gap-1 text-sm`)}>
                <Clock className="h-4 w-4" />
                19:30
              </div>
            </div>
            <div className={twMerge(`text-text-sub flex items-center gap-1 text-sm`)}>
              <MapPin className="h-4 w-4" />
              KSPO DOME(올림픽체조경기장)
            </div>
            <div className={twMerge(`text-text-sub flex items-center gap-1 text-sm`)}>
              <Ticket className="h-4 w-4" />
              99,000 ~ 121,000원
            </div>
          </div>
          <Link href="/concerts/1">
            <Button>자세히보기</Button>
          </Link>
        </div>
        <Button variant="outline" size="icon" className="border-border hover:bg-border">
          <Heart />
        </Button>
      </CardContent>
    </Card>
  );
}
