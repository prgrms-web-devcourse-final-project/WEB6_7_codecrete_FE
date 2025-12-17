import MateListPostList from "./MateListPostList";
import MateListTagNav from "./MateListTagNav";

export default function MateListContent() {
  return (
    <section>
      <MateListTagNav />
      <MateListPostList />
    </section>
  );
}
