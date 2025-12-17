"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function MateListTagNav() {
  const tabs = [
    { id: "all", label: "전체 글" },
    { id: "before", label: "공연 동행" },
    { id: "meal", label: "밥 동행" },
    { id: "transport", label: "교통 동행" },
  ];

  const [activeTab, setActiveTab] = useState("all");

  return (
    <nav className="border-border border-y px-15 py-4">
      <div className={twMerge(`mx-auto flex w-full max-w-400 gap-3`)}>
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            variant={activeTab === tab.id ? "default" : "outline"}
            size="default"
            className={`px-6 py-3 ${
              activeTab === tab.id
                ? "bg-point-main border-border cursor-pointer"
                : "bg-point-sub cursor-pointer"
            }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>
    </nav>
  );
}
