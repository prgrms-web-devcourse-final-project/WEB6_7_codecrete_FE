import { ConcertData } from "@/types/concerts";
import AdminConcertListContent from "./AdminConcertListContent";

export default async function AdminConcertListWrapper({
  initialList,
}: {
  initialList: ConcertData[];
}) {
  return <AdminConcertListContent initialList={initialList} />;
}
