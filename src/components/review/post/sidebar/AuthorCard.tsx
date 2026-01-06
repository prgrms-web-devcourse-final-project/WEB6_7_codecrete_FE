"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { UserInfo } from "@/types/user";
import { getUserInfo } from "@/lib/api/user/user.client";
import { toast } from "sonner";

export default function AuthorCard({ authorId }: { authorId: number }) {
  const [author, setAuthor] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuthor = async () => {
      setIsLoading(true);
      try {
        const data = await getUserInfo(authorId);
        setAuthor(data);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (authorId) {
      fetchAuthor();
    }
  }, [authorId]);

  if (isLoading) {
    return (
      <Card className={"flex flex-col gap-4 p-6"}>
        {/* 타이틀은 고정해서 사용자가 어떤 영역인지 알게 합니다 */}
        <CardTitle>작성자 정보</CardTitle>

        <div className={"flex animate-pulse gap-4"}>
          {/* 아바타 스켈레톤: 원형(rounded-full)과 크기(h-16 w-16) 유지 */}
          <div className="h-16 w-16 rounded-full bg-gray-200" />

          {/* 닉네임 스켈레톤: 중앙 정렬(justify-center) 유지 */}
          <div className={"flex flex-col justify-center"}>
            <div className="h-5 w-24 rounded bg-gray-200" />
          </div>
        </div>
      </Card>
    );
  }

  if (!author) return null;

  return (
    <Card className={"flex flex-col gap-4 p-6"}>
      <CardTitle>작성자 정보</CardTitle>
      <div className={"flex gap-4"}>
        <Avatar className={"h-16 w-16"}>
          <AvatarImage src={author.profileImageUrl} alt={author.nickname} />
          <AvatarFallback>{author.nickname.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className={"flex flex-col justify-center"}>
          <span>{author.nickname}</span>
        </div>
      </div>
    </Card>
  );
}
