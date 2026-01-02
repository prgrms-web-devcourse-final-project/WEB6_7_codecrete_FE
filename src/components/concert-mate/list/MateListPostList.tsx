import MateListCard from "@/components/concert-mate/list/MateListCard";
import PagePagination from "@/components/common/PagePagination";
import { getPostsList } from "@/lib/api/community/community.server";

export default async function MateListPostList() {
  const res = await getPostsList({ category: "JOIN", page: 0 });
  const posts = res?.content || [];
  // const totalPages = res?.totalPages || 0;

  // console.log(res);

  return (
    <section className="px-15">
      <div className="mx-auto w-full max-w-400">
        <div className="flex flex-col gap-6 py-12">
          {/* {Array.from({ length: 5 }).map((_, index) => (
            <MateListCard key={index} />
          ))} */}
          {posts.length > 0 ? posts.map((_, index) => <MateListCard key={index} />) : "빈화면처리"}
        </div>
        <PagePagination />
      </div>
    </section>
  );
}
