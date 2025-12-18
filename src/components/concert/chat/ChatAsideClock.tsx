"use client";

/**
 * TODO: 서버 시간 연동
 *
 * 1. 백엔드에서 서버 기준 현재 시간(timestamp)을 내려주는 API 구현
 *    - 예: GET /api/server-time
 *    - 응답: { serverTime: number } (ms 단위)
 *
 * 2. 클라이언트에서 최초 렌더 시 서버 시간 fetch
 *    - useEffect 내부에서 요청
 *    - 네트워크 지연 보정은 추후 필요 시 추가 (RTT/2)
 *
 * 3. FlipClock을 autoStart=false 로 생성
 *    - 서버에서 받은 시간을 기준(Date 객체)으로 setTime
 *
 * 4. 클라이언트에서 setInterval(1000ms)로 시간을 증가시켜 표시
 *    - 서버 시간은 '기준값'만 사용
 *    - 이후 tick은 클라이언트에서 처리
 *
 * 5. 일정 주기(30~60초)로 서버 시간 재동기화하여 드리프트 보정
 *
 * ※ 네이비즘/예매 사이트와 동일한 방식:
 *    서버 시간 기준 + 클라이언트 tick
 */

import { useEffect, useRef } from "react";
import { FlipClock, clock, theme, css } from "flipclock";

export default function ChatAsideClock() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const instance = new FlipClock({
      parent: ref.current,
      face: clock({
        format: "HH:mm:ss",
      }),
      theme: theme({
        css: css({
          width: "44px",
          height: "80px",
          fontSize: "42px",
        }),
      }),
      autoStart: true,
    });

    return () => {
      instance.unmount();
    };
  }, []);

  return (
    <div className={"flex flex-col gap-8"}>
      <h3 className="text-text-main text-xl font-bold">서버 시간</h3>
      <div ref={ref} />
    </div>
  );
}
