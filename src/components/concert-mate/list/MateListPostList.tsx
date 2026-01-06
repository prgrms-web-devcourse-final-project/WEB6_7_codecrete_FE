import MateListCard from "@/components/concert-mate/list/MateListCard";
import { getLikesCount, getPostsList } from "@/lib/api/community/community.server";
import { MatePagination } from "@/components/concert-mate/list/MatePagination";
import { getUserInfo } from "@/lib/api/user/user.server";
import { getConcertDetail } from "@/lib/api/concerts/concerts.server";
import { UserInfo } from "@/types/user";
import { ConcertDetail } from "@/types/concerts";

export default async function MateListPostList({ pageParam }: { pageParam: number }) {
  const res = await getPostsList({ category: "JOIN", page: pageParam });

  if (!res) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  const posts = res?.content || [];
  const currentPage = res?.page || 0;
  const totalPages = res?.totalPages || 0;

  // TODO : 리팩토링 - 다시 보기
  const userIds = Array.from(new Set(posts.map((post) => post.userId)));
  const concertIds = Array.from(new Set(posts.map((post) => String(post.concertId))));
  const postIds = posts.map((post) => post.postId); // 좋아요용 postId
  // const userInfoRes = await getUserInfo(res?.content.userId);
  // const concertInfoRes = await getConcertDetail({ concertId: String(post.concertId) });

  const [users, concert, likeCounts] = await Promise.all([
    Promise.all(userIds.map((id) => getUserInfo(id))),
    Promise.all(concertIds.map((id) => getConcertDetail({ concertId: id }))),
    Promise.all(postIds.map((id) => getLikesCount({ postId: id }))),
  ]);

  const userMap: Map<number, UserInfo> = new Map(
    users.filter((u): u is UserInfo => u !== null).map((u) => [u.id, u])
  );

  const concertMap: Map<string, ConcertDetail> = new Map(
    concert.filter((c): c is ConcertDetail => c !== null).map((c) => [String(c.concertId), c])
  );

  const likeCountMap: Map<number, string> = new Map(
    posts.map((post, index) => [post.postId, likeCounts[index] || "0"])
  );

  return (
    <section className="px-15">
      <div className="mx-auto w-full max-w-400">
        <div className="flex flex-col gap-6 py-12">
          {posts.length > 0 ? (
            posts.map((post) => (
              <MateListCard
                key={post.postId}
                post={post}
                user={userMap.get(post.userId)}
                concert={concertMap.get(String(post.concertId))}
                likeCount={likeCountMap.get(post.postId)}
              />
            ))
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
