import MateListCard from "@/components/concert-mate/list/MateListCard";
import PagePagination from "@/components/common/PagePagination";

export default function MateListPostList() {
  return (
    <section className="mx-auto w-full max-w-400 px-15">
      <div className="flex flex-col gap-6 py-12">
        {Array.from({ length: 5 }).map((_, index) => (
          <MateListCard key={index} />
        ))}
      </div>
      <PagePagination />
    </section>
  );
}
