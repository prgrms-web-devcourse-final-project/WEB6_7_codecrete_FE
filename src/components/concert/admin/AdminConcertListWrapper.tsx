"use client";

import { useEffect, useState } from "react";
import { getNoTicketTimeLists } from "@/lib/api/admin/admin.client";
import AdminConcertListContent from "./AdminConcertListContent";
import { ConcertData } from "@/types/concerts";

export default function AdminConcertListWrapper() {
  const [initialList, setInitialList] = useState<ConcertData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getNoTicketTimeLists({ page: 0, size: 12 });
      setInitialList(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-4">로딩 중...</div>;
  }

  if (!initialList) {
    return <div className="p-4">티켓팅 시간이 없는 공연이 없습니다.</div>;
  }

  return <AdminConcertListContent initialList={initialList} />;
}
