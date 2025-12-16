import { ConcertListProps } from "@/types/my-page";
import { MapPin, Clock, Ticket, Calendar } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ProfileNoImage from "../common/ProfileNoImage";
import { Separator } from "../ui/separator";
import { FieldSeparator } from "../ui/field";

export default function MyPageCalendarList({
  concerts,
  schedules,
  selectedDate,
}: ConcertListProps) {
  const dateStr = selectedDate.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (concerts.length === 0 && schedules.length === 0) {
    return (
      <section className="space-y-4">
        <h3 className="text-lg font-bold">{dateStr}</h3>
        <p className="border-border text-text-sub rounded-lg border px-5 py-20 text-center">
          해당 날짜에 일정이 없습니다.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-bold">{dateStr}</h3>
      <div className="flex flex-col gap-8">
        {concerts.length > 0 && (
          <>
            <FieldSeparator className="*:text-text-main h-auto *:px-10 *:text-base *:font-bold">
              콘서트
            </FieldSeparator>

            <div className="space-y-4">
              {concerts.map((concert) => (
                <div key={concert.id} className="border-border flex gap-5 rounded-lg border p-5">
                  {/* 포스터 이미지 */}
                  <div className="bg-bg-sub flex h-32 w-32 shrink-0 items-center justify-center rounded-lg">
                    <span className="text-sm text-zinc-500">Concert Poster</span>
                  </div>

                  {/* 콘서트 정보 */}
                  <div className="flex flex-1 flex-col justify-between gap-2">
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold">{concert.title}</h4>
                      <div className="text-text-sub mt-2 space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          <span>{concert.venue}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          <span>{concert.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Ticket size={16} />
                          <span>{concert.priceRange}</span>
                        </div>
                      </div>
                    </div>

                    {/* 버튼 */}
                    <div className="flex justify-end gap-2">
                      <Button>상세보기</Button>
                      <Button variant="outline">계획 추가하기</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {schedules.length > 0 && (
          <>
            <FieldSeparator className="*:text-text-main h-auto *:px-10 *:text-base *:font-bold">
              일정
            </FieldSeparator>
            <div className="space-y-4">
              {schedules.map((schedule) => (
                <div key={schedule.id} className="border-border flex gap-4 rounded-lg border p-4">
                  {/* 포스터 */}
                  <div className="bg-muted flex h-32 w-32 shrink-0 items-center justify-center rounded-lg">
                    <span className="text-text-sub text-sm">Concert Poster</span>
                  </div>

                  {/* 일정 정보 */}
                  <div className="flex flex-1 flex-col justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-bold">{schedule.concertTitle}</h4>
                        <span className="text-text-sub text-xs">{schedule.daysUntil}일 후</span>
                      </div>
                      <div className="text-text-sub space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {schedule.date} • {schedule.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{schedule.venue}</span>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      {schedule.goingWith.length === 0 && (
                        <span className="text-text-sub text-xs">참여자 </span>
                      )}
                      {schedule.goingWith.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-text-sub text-xs">참여자 </span>
                          <div className="flex -space-x-2">
                            {schedule.goingWith.map((friend, idx) => {
                              if (idx < 3)
                                return (
                                  <Avatar className="ring-bg-main size-8 ring-2" key={idx}>
                                    <AvatarImage />
                                    <AvatarFallback>
                                      <ProfileNoImage size="xs" alt={friend} />
                                    </AvatarFallback>
                                  </Avatar>
                                );
                            })}
                            {schedule.goingWith.length > 3 && (
                              <Avatar className="ring-bg-main bg-bg-sub size-8 ring-2">
                                <AvatarFallback className="text-text-main text-xs font-medium">
                                  +{schedule.goingWith.length - 3}
                                </AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                        </div>
                      )}
                      <Button>관리하기</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
