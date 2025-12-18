import { redirect } from "next/navigation";

export default function Page() {
  redirect("/home");

  return <p>인트로 페이지 작업 예정</p>;
}
