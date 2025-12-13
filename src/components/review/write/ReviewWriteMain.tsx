import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import Image from "next/image";
import { Calendar, Clock4, Flame, Heart, Music, Send, Spotlight, Star, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import ReviewDetailRating from "@/components/review/write/ReviewDetailRating";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileUploadBox } from "@/components/review/write/FileUploadBox";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function ReviewWriteMain() {
  return (
    <section className={"bg-bg-main flex justify-center px-15 py-16"}>
      <div className={"flex w-full max-w-400 flex-col gap-8"}>
        <Card className={"gap-8 p-12"}>
          {/*글 작성 헤더*/}
          <CardHeader>
            <CardTitle className={"text-2xl"}>공연의 감동을 나눠주세요</CardTitle>
            <CardDescription>
              직접 다녀온 공연의 이야기를 들려주세요. 당신의 리뷰가 누군가의 최고의 공연을 찾아줄 수
              있어요.
            </CardDescription>
          </CardHeader>

          {/*콘서트 선택 부분*/}
          <CardContent className={"flex flex-col gap-2"}>
            <CardTitle>
              공연 선택 <span className={"text-text-sub"}>*</span>
            </CardTitle>
            <Select>
              <SelectTrigger className={"h-13! w-full px-4 py-3"}>
                <SelectValue placeholder={"어떤 공연을 보고 오셨나요?"} />{" "}
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>공연명</SelectLabel>
                  {/*TODO: 나중에 value 부분을 해당 공연의 id로 바꾸기*/}
                  <SelectItem value="apple">YE LIVE IN KOREA</SelectItem>
                  <SelectItem value="banana">CIRCUS MAXIMUS in Korea</SelectItem>
                  <SelectItem value="blueberry">
                    ZUTOMAYO INTENSE II 「坐・ZOMBIE CRAB LABO」
                  </SelectItem>
                  <SelectItem value="grapes">IU HEREH World Tour</SelectItem>
                  <SelectItem value="pineapple">
                    ONE OK ROCK DETOX Asia Tour 2026 in Korea
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardContent>

          {/*불러온 콘서트 카드 부분*/}
          {/*TODO: 아래 부분은 select로 클릭했을 시 보여주는 아이템 클릭 안되면 안보이게 하기*/}
          {/*TODO: 위에 있는 SELCET에서 클릭한 id에 해당하는 콘서트를 보여주기*/}
          <CardContent>
            <Item className={"bg-bg-sub flex w-full gap-6 p-6"} variant="outline" role="listitem">
              <ItemMedia variant="image" className={"relative h-20 w-20 shrink-0"}>
                <Image
                  src={"/Madvillainy_cover.png"}
                  alt={"concert"}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className={"text-lg"}>IU HEREH World Tour</ItemTitle>
                <ItemDescription>Seoul Olympic Stadium</ItemDescription>
                <div className={"flex gap-4"}>
                  <ItemDescription className={"flex items-center justify-center gap-2 text-xs"}>
                    <Calendar size={12} />
                    <span>March 15, 2025</span>
                  </ItemDescription>
                  <ItemDescription className={"flex items-center justify-center gap-2 text-xs"}>
                    <Clock4 size={12} />
                    <span>19:00</span>
                  </ItemDescription>
                </div>
              </ItemContent>
            </Item>
          </CardContent>

          {/*리뷰 작성 제목 작성 부분*/}
          <CardContent className={"flex flex-col gap-2"}>
            <CardTitle>
              리뷰 제목 <span className={"text-text-sub"}>*</span>
            </CardTitle>
            <Input className={"h-13"} placeholder={"리뷰 제목을 입력해주세요."} />
            <p className={"text-text-sub text-xs"}>공연의 인상을 한 문장으로 표현해보세요</p>
          </CardContent>

          {/*총 별점 파트*/}
          <CardContent>
            <CardTitle className={"flex items-center justify-between"}>
              <CardTitle>
                종합 평점 <span className={"text-text-sub"}>*</span>
              </CardTitle>
              <div className={"flex"}>
                <Star fill="true" />
                <Star fill="true" />
                <Star fill="true" />
                <Star fill="true" />
                <Star />
              </div>
            </CardTitle>
          </CardContent>

          {/*별점 상세 파트*/}
          <CardContent className={"flex flex-col gap-4"}>
            <CardTitle>세부 평가</CardTitle>
            <ReviewDetailRating title={"퍼포먼스 완성도"} />
            <ReviewDetailRating title={"공연장 & 시설"} />
            <ReviewDetailRating title={"음향 퀄리티"} />
            <ReviewDetailRating title={"가격 대비 만족도"} />
          </CardContent>

          {/*리뷰 작성 파트*/}
          <CardContent>
            <div className="grid w-full gap-3">
              <Label htmlFor="message-2">
                리뷰 작성<span className={"text-text-sub"}>*</span>
              </Label>
              <Textarea
                className={"h-50 resize-none"}
                placeholder="공연의 분위기, 무대 연출, 관객 반응까지
느꼈던 그대로 자유롭게 적어주세요."
                id="message-2"
              />
              <p className="text-text-sub text-xs">
                최소 100자 이상 작성해주세요. 구체적인 후기는 다른 관객들에게 큰 도움이 됩니다.
              </p>
            </div>
          </CardContent>

          {/*좌석 정보 파트*/}
          <CardContent className={"flex flex-col gap-2"}>
            <CardTitle>좌석 정보</CardTitle>
            <div className={"flex gap-2"}>
              <Input className={"h-13"} placeholder={"구역 (예: A구역, 스탠딩)"} />
              <Input className={"h-13"} placeholder={"열 / 좌석 번호 (예: 12열 15번)"} />
            </div>
            <CardDescription className={"text-xs"}>
              이 자리, 잘 보였나요? 후기로 알려주세요
            </CardDescription>
          </CardContent>

          {/*이미지 업로드 파트*/}
          <CardContent className={"flex flex-col gap-2"}>
            <CardTitle>사진 업로드</CardTitle>
            <FileUploadBox />
            <CardDescription className={"text-xs"}>
              무대, 시야, 현장 분위기가 담긴 사진을 공유해보세요
            </CardDescription>
          </CardContent>

          <div className="px-6">
            <Separator />
          </div>

          <CardContent className={"flex flex-col gap-4"}>
            <CardTitle>태그 선택</CardTitle>
            <div className={"flex flex-wrap gap-2"}>
              <Button variant={"outline"} type={"button"} className={"cursor-pointer rounded-full"}>
                <Music /> 가창력 미쳤다
              </Button>
              <Button variant={"outline"} type={"button"} className={"cursor-pointer rounded-full"}>
                <Flame /> 에너지 폭발
              </Button>
              <Button variant={"outline"} type={"button"} className={"cursor-pointer rounded-full"}>
                <Heart /> 감동적인 공연
              </Button>
              <Button variant={"outline"} type={"button"} className={"cursor-pointer rounded-full"}>
                <Users /> 관객 호응 최고
              </Button>
              <Button variant={"outline"} type={"button"} className={"cursor-pointer rounded-full"}>
                <Star /> 기억에 남는 무대
              </Button>
              <Button variant={"outline"} type={"button"} className={"cursor-pointer rounded-full"}>
                <Spotlight /> 무대 연출 최고
              </Button>
            </div>
            <Input className={"h-13"} placeholder={"직접 태그를 추가해보세요 (Enter 입력)"} />
          </CardContent>

          <div className="px-6">
            <Separator />
          </div>

          <CardContent className={"flex flex-col gap-4"}>
            <div className="bg-bg-sub flex w-full items-start gap-3 p-6">
              <Checkbox
                className={"bg-bg-main border-border-point"}
                id="review-confirm"
                type={"button"}
              />

              <Label htmlFor="review-confirm" className="text-text-main flex flex-col items-start">
                <span>
                  본 리뷰는 직접 관람한 경험을 바탕으로 작성되었으며, 커뮤니티 가이드라인을
                  준수했음을 확인합니다.
                </span>
                <span>허위 또는 오해를 유발하는 리뷰는 계정 이용에 제한이 있을 수 있습니다.</span>
              </Label>
            </div>
          </CardContent>

          <CardFooter className={"flex justify-end gap-3"}>
            <Button type={"reset"} variant={"outline"} className={"cursor-pointer"}>
              취소
            </Button>
            <Button type={"submit"} className={"cursor-pointer"}>
              <Send /> 리뷰 등록하기
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
