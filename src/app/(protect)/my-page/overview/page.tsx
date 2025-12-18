import MyPageAside from "@/components/my-page/MyPageAside";
import MyPageCalendar from "@/components/my-page/MyPageCalendar";

export default function Page() {
  return (
    <div className="px-15 py-10">
      <div className="mx-auto flex w-full max-w-400 gap-8">
        <MyPageCalendar />
        <MyPageAside />
      </div>
    </div>
  );
}
