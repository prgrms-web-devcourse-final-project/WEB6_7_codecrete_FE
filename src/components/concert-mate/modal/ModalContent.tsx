"use client";

import PagePagination from "@/components/common/PagePagination";
import SearchInput from "@/components/concert-mate/SearchInput";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function ModalContent() {
  const [selectedConcert, setSelectedConcert] = useState<string | null>(null);

  const ConcertMockup = [
    {
      src: "/ConcertPoster.png",
      title: "concert1",
      data: "March 26, 2025",
      venue: "Barclays Center",
    },
    {
      src: "/ConcertPoster.png",
      title: "concert2",
      data: "March 27, 2025",
      venue: "Barclays Center",
    },
    {
      src: "/ConcertPoster.png",
      title: "concert3",
      data: "March 28, 2025",
      venue: "Barclays Center",
    },
    {
      src: "/ConcertPoster.png",
      title: "concert4",
      data: "March 29, 2025",
      venue: "Barclays Center",
    },
    {
      src: "/ConcertPoster.png",
      title: "concert5",
      data: "March 30, 2025",
      venue: "Barclays Center",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <SearchInput placeholder="공연명을 입력해주세요" />
      <RadioGroup
        value={selectedConcert || ""}
        onValueChange={setSelectedConcert}
        className="concert-card flex flex-col gap-2"
      >
        {ConcertMockup.map((item, index) => (
          <div key={index} className="flex w-full">
            <div className="relative">
              <Image
                src={item.src}
                alt={item.title}
                width={120}
                height={120}
                className="aspect-square shrink-0 rounded-l-lg"
              />
              <Badge
                className={twMerge(
                  `bg-point-main text-text-point-main absolute bottom-3 left-3 z-0 mr-2 text-sm`
                )}
              >
                Rock
              </Badge>
            </div>
            {/* TODO : 전체 div누르면 선택과 호버 */}
            <div className={twMerge(`flex flex-1 flex-col gap-2 px-4 py-5`)}>
              <div className="flex items-center justify-between">
                <Label htmlFor="radio" className="text-lg">
                  {item.title}
                </Label>
                {/* TODO: 나중에 value 부분을 해당 공연의 id로 바꾸기*/}
                <RadioGroupItem value={item.title} id="radio" className="border-border-point" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-text-sub flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <p>{item.data}</p>
                </div>
                <div className="text-text-sub flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <p>{item.venue}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </RadioGroup>
      <PagePagination />
    </div>
  );
}
