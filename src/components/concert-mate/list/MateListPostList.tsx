import MateListCard from "@/components/concert-mate/list/MateListCard";
import PagePagination from "@/components/common/PagePagination";
import { getPostsList } from "@/lib/api/community/community.server";

export default async function MateListPostList() {
  const res = await getPostsList({ category: "JOIN", page: 1 });
  const posts = res?.content || [];
  // const totalPages = res?.totalPages || 0;

  return (
    <section className="px-15">
      <div className="mx-auto w-full max-w-400">
        <div className="flex flex-col gap-6 py-12">
          {posts.length > 0
            ? posts.map((post) => <MateListCard key={post.postId} />)
            : "데이터 없음"}
        </div>
        <PagePagination />
      </div>
    </section>
  );
}
