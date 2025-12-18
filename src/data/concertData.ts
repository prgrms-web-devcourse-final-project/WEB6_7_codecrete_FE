import { Concert } from "@/types/my-page";

export const concertData: Concert[] = [
  // 2025년 12월
  {
    id: "1",
    artist: "TOMORROW X TOGETHER",
    title: "ACT: TOMORROW Tour",
    venue: "VANTELIN DOME",
    location: "Nagoya",
    date: "2025-12-06",
    time: "6:00 PM - 9:00 PM",
    priceRange: "¥12,000 - ¥18,000",
  },
  {
    id: "2",
    artist: "BLACKPINK",
    title: "DEADLINE World Tour",
    venue: "Tokyo Dome",
    location: "Tokyo",
    date: "2025-12-14",
    time: "6:30 PM - 9:30 PM",
    priceRange: "¥15,000 - ¥35,000",
  },
  {
    id: "3",
    artist: "Ariana Grande",
    title: "Eternal Sunshine Tour",
    venue: "Madison Square Garden",
    location: "New York",
    date: "2025-12-14",
    time: "8:00 PM - 10:30 PM",
    priceRange: "$150 - $450",
  },
  {
    id: "4",
    artist: "SUPER JUNIOR-D&E",
    title: "2025 Fan Party",
    venue: "Olympic Hall",
    location: "Seoul",
    date: "2025-12-21",
    time: "7:00 PM - 9:00 PM",
    priceRange: "₩99,000 - ₩154,000",
  },
  {
    id: "5",
    artist: "André Rieu",
    title: "Christmas Concert",
    venue: "MECC",
    location: "Maastricht",
    date: "2025-12-21",
    time: "8:00 PM - 10:30 PM",
    priceRange: "€75 - €195",
  },
  {
    id: "6",
    artist: "KickFlip",
    title: "From KickFlip, To WeFlip Fan-Con",
    venue: "KINTEX Exhibition 2",
    location: "Seoul",
    date: "2025-12-28",
    time: "6:00 PM - 8:30 PM",
    priceRange: "₩88,000 - ₩132,000",
  },
  {
    id: "7",
    artist: "izykite",
    title: "LOVE? LOVE! Concert",
    venue: "Grand Peace Palace",
    location: "Seoul",
    date: "2025-12-28",
    time: "5:00 PM - 7:00 PM",
    priceRange: "₩77,000 - ₩110,000",
  },
  {
    id: "8",
    artist: "The Weeknd",
    title: "After Hours Til Dawn",
    venue: "Crypto.com Arena",
    location: "Los Angeles",
    date: "2025-12-28",
    time: "8:30 PM - 11:00 PM",
    priceRange: "$95 - $350",
  },

  // 2026년 1월
  {
    id: "9",
    artist: "Baekhyun",
    title: "Reverie [dot]",
    venue: "KSPO Dome",
    location: "Seoul",
    date: "2026-01-02",
    time: "6:00 PM - 8:30 PM",
    priceRange: "₩132,000 - ₩165,000",
  },
  {
    id: "10",
    artist: "BABYMONSTER",
    title: "LOVE MONSTERS",
    venue: "Taipei Arena",
    location: "Taipei",
    date: "2026-01-02",
    time: "7:00 PM - 9:30 PM",
    priceRange: "NT$2,800 - NT$6,800",
  },
  {
    id: "11",
    artist: "NCT DREAM",
    title: "THE DREAM SHOW 4",
    venue: "Osaka-Jo Hall",
    location: "Osaka",
    date: "2026-01-08",
    time: "6:30 PM - 9:00 PM",
    priceRange: "¥12,500 - ¥16,500",
  },
  {
    id: "12",
    artist: "TOMORROW X TOGETHER",
    title: "ACT: TOMORROW Tour",
    venue: "AsiaWorld-Arena",
    location: "Hong Kong",
    date: "2026-01-09",
    time: "7:30 PM - 10:00 PM",
    priceRange: "HK$980 - HK$1,980",
  },
  {
    id: "13",
    artist: "Kim Se Jeong",
    title: "Tenth Letter",
    venue: "Taipei International Convention Center",
    location: "Taipei",
    date: "2026-01-23",
    time: "7:00 PM - 9:00 PM",
    priceRange: "NT$2,400 - NT$4,800",
  },
  {
    id: "14",
    artist: "ATEEZ",
    title: "IN YOUR FANTASY",
    venue: "NTSU Arena",
    location: "Taipei",
    date: "2026-01-24",
    time: "6:30 PM - 9:00 PM",
    priceRange: "NT$3,200 - NT$5,800",
  },
  {
    id: "15",
    artist: "BLACKPINK",
    title: "DEADLINE World Tour",
    venue: "Kai Tak Stadium",
    location: "Hong Kong",
    date: "2026-01-24",
    time: "7:30 PM - 10:00 PM",
    priceRange: "HK$1,280 - HK$2,980",
  },
  {
    id: "16",
    artist: "DAY6",
    title: "The DECADE",
    venue: "SM Mall of Asia Arena",
    location: "Manila",
    date: "2026-01-24",
    time: "7:00 PM - 9:30 PM",
    priceRange: "₱3,500 - ₱8,500",
  },
];

// 콘서트 날짜별 이벤트 카운트 생성
export const concertEvents: Record<string, number> = concertData.reduce(
  (acc, concert) => {
    acc[concert.date] = (acc[concert.date] || 0) + 1;
    return acc;
  },
  {} as Record<string, number>
);

// 특정 날짜의 콘서트 목록 가져오기
export const getConcertsByDate = (dateStr: string): Concert[] => {
  return concertData.filter((concert) => concert.date === dateStr);
};
