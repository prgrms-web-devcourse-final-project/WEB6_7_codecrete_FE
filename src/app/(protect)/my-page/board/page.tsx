import MyPageCommentList from "@/components/my-page/MyPageCommentList";
import MyPagePostList from "@/components/my-page/MyPagePostList";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMe } from "@/lib/api/auth/auth.server";
import { getMyWrittenPosts, getMyWrittenComments } from "@/lib/api/myPage/myPage.server";
import { User } from "@/types/user";

export default async function Page() {
  const posts = await getMyWrittenPosts();
  const comments = await getMyWrittenComments();

  const res = await getMe();
  const userData = res.data as User;

  return (
    <div className="space-y-20 px-5 py-8 lg:px-15 lg:py-10">
      <Tabs defaultValue="posts" className="gap-10">
        <TabsList className="bg-background *:text-text-sub *:aria-selected:text-text-main w-full justify-center gap-10 *:flex-none *:border-none *:p-0 *:text-base *:font-bold *:shadow-none! md:*:text-lg lg:*:text-xl">
          <TabsTrigger value="posts" className="bg-background!">
            내가 작성한 글
          </TabsTrigger>
          <Separator orientation="vertical" className="bg-border! h-4!" />
          <TabsTrigger value="comments" className="bg-background!">
            내가 작성한 댓글
          </TabsTrigger>
        </TabsList>
        <section className="mx-auto w-full max-w-400">
          <TabsContent value="posts">
            <MyPagePostList user={userData} posts={posts.data?.content} />
          </TabsContent>
          <TabsContent value="comments">
            <MyPageCommentList user={userData} comments={comments.data?.content} />
          </TabsContent>
        </section>
      </Tabs>
    </div>
  );
}
