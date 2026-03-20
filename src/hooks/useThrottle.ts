"use client";

import { useEffect, useState } from "react";

export function useThrottle<T>(value: T, delay = 100) {
  const [throttled, setThrottled] = useState(value);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (throttled !== value) {
      timer = setTimeout(() => {
        setThrottled(value);
      }, delay);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [value, delay, throttled]);

  return throttled;
}
