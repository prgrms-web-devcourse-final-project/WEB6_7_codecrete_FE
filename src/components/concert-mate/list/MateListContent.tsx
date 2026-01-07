import MateListPostList from "@/components/concert-mate/list/MateListPostList";
// import MateListTagNav from "@/components/concert-mate/list/MateListTagNav";

export default function MateListContent({ pageParam }: { pageParam: number }) {
  return (
    <section>
      {/* TODO : <MateListTagNav /> */}
      <MateListPostList pageParam={pageParam} />
    </section>
  );
}
