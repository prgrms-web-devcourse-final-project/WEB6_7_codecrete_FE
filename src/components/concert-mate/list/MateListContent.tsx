import MateListPostList from "@/components/concert-mate/list/MateListPostList";
// import MateListTagNav from "@/components/concert-mate/list/MateListTagNav";

export default function MateListContent({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  return (
    <section>
      {/* TODO : <MateListTagNav /> */}
      <MateListPostList searchParams={searchParams} />
    </section>
  );
}
