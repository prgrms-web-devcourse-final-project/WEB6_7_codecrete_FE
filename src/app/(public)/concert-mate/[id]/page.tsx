import MateDetailMain from "@/components/concert-mate/detail/MateDetailMain";
import BreadcrumbNavbar from "@/components/review/BreadcrumbNavbar";
import { getAuthStatus } from "@/lib/api/auth/auth.server";
import { getPostLikeMe } from "@/lib/api/community/community.server";
import { getPostsDetail } from "@/lib/api/community/concert-mate/mate.server";
import { getConcertDetail } from "@/lib/api/concerts/concerts.server";
import { getUserInfo, getUsersMe } from "@/lib/api/user/user.server";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  // 게시글 id
  const pageParam = await params;
  const postId = pageParam.id || "1";

  // 상세 조회 api
  const res = await getPostsDetail({ postId });
  if (!res) {
    notFound();
  }

  // 콘서트 id
  const concertId = String(res.post.concertId);
  const resConcertInfo = await getConcertDetail({ concertId });

  // 유저 id
  const userId = res.post.userId;
  const resUserInfo = await getUserInfo(userId);
  if (!resConcertInfo || !resUserInfo) {
    notFound();
  }

  // 게시글 본인 여부
  const isLoggedIn = await getAuthStatus();
  const currentUser = isLoggedIn ? await getUsersMe() : null;
  const currentUserId = currentUser?.id;
  const isAuthor = String(userId) === String(currentUserId);

  // 게시글 좋아요
  const isLiked = await getPostLikeMe(Number(postId));

  return (
    <>
      <BreadcrumbNavbar
        items={[
          { label: "홈", href: "/home" },
          { label: "구인 게시판", href: "/concert-mate" },
          { label: res.post.title },
        ]}
      />
      <MateDetailMain
        postId={postId}
        res={res}
        concertDetail={resConcertInfo}
        userDetail={resUserInfo}
        isAuthor={isAuthor}
        isLiked={isLiked}
      />
    </>
  );
}
