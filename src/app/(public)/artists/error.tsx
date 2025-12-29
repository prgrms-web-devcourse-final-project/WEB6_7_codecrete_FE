// TODO: 나중에 이 페이지는 삭제하기

"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-semibold">문제가 발생했습니다</h2>
      <p className="text-text-sub">아티스트 목록을 불러오는 중 오류가 발생했어요.</p>
      <button className="bg-point-main rounded px-4 py-2 text-white" onClick={() => reset()}>
        다시 시도
      </button>
    </div>
  );
}
