import MyPageCommentList from "@/components/my-page/MyPageCommentList";
import MyPagePostList from "@/components/my-page/MyPagePostList";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMe } from "@/lib/api/auth/auth.server";
import { getMyWrittenPosts, getMyWrittenComments } from "@/lib/api/myPage/myPage.server";
import { User } from "@/types/user";
import { twMerge } from "tailwind-merge";

export default async function Page() {
  const posts = await getMyWrittenPosts();
  const comments = await getMyWrittenComments();
  // const likes = await getMyLikePosts();

  const res = await getMe();
  const userData = res.data as User;

  return (
    <div className="my-15 px-15">
      <Tabs defaultValue="posts" className="gap-10">
        <TabsList
          className={twMerge(
            "bg-background w-full justify-center gap-10",
            "*:flex-none *:border-none *:p-0 *:text-xl *:shadow-none!"
          )}
        >
          <TabsTrigger value="posts" className="bg-background!">
            내가 작성한 글
          </TabsTrigger>
          <Separator orientation="vertical" className="bg-border! h-4!" />
          <TabsTrigger value="comments" className="bg-background!">
            내가 작성한 댓글
          </TabsTrigger>
          {/* <Separator orientation="vertical" className="bg-border! h-4!" />
          <TabsTrigger value="likes" className="bg-background!">
            좋아요한 글
          </TabsTrigger> */}
        </TabsList>
        <section className="mx-auto w-full max-w-400">
          <TabsContent value="posts">
            <MyPagePostList user={userData} posts={posts.data?.content} />
          </TabsContent>
          <TabsContent value="comments">
            <MyPageCommentList user={userData} comments={comments.data?.content} />
          </TabsContent>
          {/* <TabsContent value="likes">
            <MyPageLikeList likes={likes.data?.content} />
          </TabsContent> */}
        </section>
      </Tabs>
    </div>
  );
}
