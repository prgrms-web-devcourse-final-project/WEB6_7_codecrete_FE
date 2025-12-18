import MyPageCommentList from "@/components/my-page/MyPageCommentList";
import MyPageLikeList from "@/components/my-page/MyPageLikeList";
import MyPagePostList from "@/components/my-page/MyPagePostList";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { twMerge } from "tailwind-merge";

export default function Page() {
  return (
    <div className="my-15 px-15">
      <Tabs defaultValue="posts" className="gap-10">
        <TabsList
          className={twMerge(
            "bg-background w-full justify-center gap-10",
            "*:flex-none *:border-none *:p-0 *:text-xl *:shadow-none!"
          )}
        >
          <TabsTrigger value="posts">내가 작성한 글</TabsTrigger>
          <Separator orientation="vertical" className="h-4!" />
          <TabsTrigger value="comments">내가 작성한 댓글</TabsTrigger>
          <Separator orientation="vertical" className="h-4!" />
          <TabsTrigger value="likes">좋아요한 글</TabsTrigger>
        </TabsList>
        <section className="mx-auto w-full max-w-400">
          <TabsContent value="posts">
            <MyPagePostList />
          </TabsContent>
          <TabsContent value="comments">
            <MyPageCommentList />
          </TabsContent>
          <TabsContent value="likes">
            <MyPageLikeList />
          </TabsContent>
        </section>
      </Tabs>
    </div>
  );
}
