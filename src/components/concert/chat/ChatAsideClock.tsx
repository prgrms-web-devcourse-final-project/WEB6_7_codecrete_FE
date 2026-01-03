import { useEffect, useRef } from "react";
import { flipClock, clock, theme, css } from "flipclock";

export default function ChatAsideClock({ offsetMillis }: { offsetMillis: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const clockRef = useRef<ReturnType<typeof flipClock> | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    clockRef.current?.unmount();
    clockRef.current = null;

    const serverNow = new Date(Date.now() + offsetMillis);

    const instance = flipClock({
      parent: ref.current,
      face: clock({
        date: serverNow,
        format: "[HH]:[mm]:[ss]", // 24시간 형식이면 이게 깔끔
      }),
      theme: theme({
        css: css({
          width: "44px",
          height: "80px",
          fontSize: "42px",
        }),
      }),
      autoStart: false,
    });

    instance.start();
    clockRef.current = instance;

    return () => {
      instance.unmount();
      clockRef.current = null;
    };
  }, [offsetMillis]);

  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-text-main text-xl font-bold">서버 시간</h3>
      <div ref={ref} />
    </div>
  );
}
