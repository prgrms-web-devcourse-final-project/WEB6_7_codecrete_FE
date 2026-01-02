import MateListPostList from "@/components/concert-mate/list/MateListPostList";
import MateListTagNav from "@/components/concert-mate/list/MateListTagNav";

export default function MateListContent() {
  return (
    <section>
      <MateListTagNav />
      <MateListPostList />
    </section>
  );
}
