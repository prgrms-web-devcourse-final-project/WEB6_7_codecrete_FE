import MateListCard from "@/components/concert-mate/list/MateListCard";
import { getPostsList } from "@/lib/api/community/community.server";
import { MatePagination } from "@/components/concert-mate/list/MatePagination";

export default async function MateListPostList({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const pageParam = Number(params.page) || 1;

  const res = await getPostsList({ category: "JOIN", page: pageParam });
  const posts = res?.content || [];
  const currentPage = res?.page || 0;
  const totalPages = res?.totalPages || 0;

  return (
    <section className="px-15">
      <div className="mx-auto w-full max-w-400">
        <div className="flex flex-col gap-6 py-12">
          {posts.length > 0 ? (
            posts.map((post) => <MateListCard key={post.postId} post={post} />)
          ) : (
            <div className="text-text-sub flex justify-center py-50 text-xl">
              <span>작성된 글이 없습니다</span>
            </div>
          )}
        </div>

        <MatePagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </section>
  );
}
