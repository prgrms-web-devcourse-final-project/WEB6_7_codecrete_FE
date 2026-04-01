import { useCallback, useState } from "react";

export function useIntersectionOnce<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const [visible, setVisible] = useState(false);

  const ref = useCallback(
    (node: T | null) => {
      if (!node || visible) return;

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      }, options);

      observer.observe(node);

      return () => observer.disconnect();
    },
    [visible, options]
  );

  return { ref, visible };
}
