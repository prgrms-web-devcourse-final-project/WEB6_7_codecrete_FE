import { UserSchedule } from "@/types/my-page";

export const userSchedules: UserSchedule[] = [
  {
    id: "s1",
    concertId: "2",
    concertTitle: "The Midnight Echo Live",
    artist: "The Midnight Echo",
    date: "2025-12-14",
    time: "8:00 PM",
    venue: "Madison Square Garden",
    location: "New York",
    goingWith: [],
    daysUntil: 10,
  },
  {
    id: "s2",
    concertId: "3",
    concertTitle: "Luna Park Festival",
    artist: "Luna Park",
    date: "2025-12-22",
    time: "6:00 PM",
    venue: "Central Park",
    location: "New York",
    goingWith: ["user1", "user2", "user3"],
    daysUntil: 17,
  },
  {
    id: "s3",
    concertId: "4",
    concertTitle: "Winter Jazz Night",
    artist: "Blue Note Ensemble",
    date: "2025-12-14",
    time: "7:30 PM",
    venue: "Blue Note Jazz Club",
    location: "New York",
    goingWith: ["user1"],
    daysUntil: 2,
  },
  {
    id: "s4",
    concertId: "5",
    concertTitle: "Holiday Special Concert",
    artist: "Christmas Orchestra",
    date: "2025-12-24",
    time: "8:00 PM",
    venue: "Carnegie Hall",
    location: "New York",
    goingWith: ["user1", "user2", "user3", "user4"],
    daysUntil: 8,
  },
  {
    id: "s5",
    concertId: "6",
    concertTitle: "New Year's Eve Countdown",
    artist: "Various Artists",
    date: "2025-12-31",
    time: "11:00 PM",
    venue: "Times Square",
    location: "New York",
    goingWith: ["user1", "user2"],
    daysUntil: 15,
  },
  {
    id: "s6",
    concertId: "7",
    concertTitle: "Rock Festival 2026",
    artist: "Rock Legends",
    date: "2026-01-10",
    time: "6:00 PM",
    venue: "Madison Square Garden",
    location: "New York",
    goingWith: ["user1", "user2", "user3"],
    daysUntil: 25,
  },
];

// 특정 날짜의 사용자 일정 가져오기
export const getSchedulesByDate = (dateStr: string): UserSchedule[] => {
  return userSchedules.filter((schedule) => schedule.date === dateStr);
};

// 캘린더 표시용 - 일정이 있는 날짜
export const scheduleEvents: Record<string, number> = userSchedules.reduce(
  (acc, schedule) => {
    acc[schedule.date] = (acc[schedule.date] || 0) + 1;
    return acc;
  },
  {} as Record<string, number>
);
