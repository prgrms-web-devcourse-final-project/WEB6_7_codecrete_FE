import QuickStat from "@/components/artist/detail/QuickStat";
import HotTrack from "@/components/artist/detail/HotTrack";
import SimilarArtists from "@/components/artist/detail/SimilarArtists";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import PosterBox from "@/components/review/post/PosterBox";
import { Clock4, Eye, Heart, MoreHorizontalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { SortSelect } from "@/components/common/SortSelect";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ReviewPostMain() {
  return (
    <section className={"px-15 py-16"}>
      <div className="mx-auto flex w-full max-w-400 gap-12">
        {/*왼쪽 파트*/}
        <section className={"flex w-full flex-col gap-8"}>
          <Card className={"p-6"}>
            <div className={"flex gap-6"}>
              <PosterBox />
              <CardContent className={"flex flex-1 flex-col gap-2"}>
                <p className={"text-text-sub"}>Concert Review</p>
                <CardTitle className={"text-xl"}>
                  IU 2025 World Tour: The Golden Hour in Seoul
                </CardTitle>
                <div className={"flex flex-col gap-4"}>
                  <div className={"flex justify-between gap-4"}>
                    <div className={"flex flex-1 flex-col gap-1"}>
                      <span className={"text-text-sub"}>Date</span>
                      <p>March 15, 2025</p>
                    </div>
                    <div className={"flex flex-1 flex-col gap-1"}>
                      <span className={"text-text-sub"}>Venue</span>
                      <p>Olympic Gymnastics Arena</p>
                    </div>
                  </div>
                  <div className={"flex justify-between gap-4"}>
                    <div className={"flex flex-1 flex-col gap-1"}>
                      <span className={"text-text-sub"}>Time</span>
                      <p>7:00 PM</p>
                    </div>
                    <div className={"flex flex-1 flex-col gap-1"}>
                      <span className={"text-text-sub"}>Section</span>
                      <p>Standing A</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>

          <header className={"flex flex-col gap-4"}>
            <h1 className={"text-4xl"}>
              Essential Tips for First-Time Concert Goers at Olympic Park
            </h1>
            <div className={"flex justify-between"}>
              <div className={"flex gap-6"}>
                <div className={"text-text-sub flex gap-6"}>
                  <div className={"flex items-center gap-2"}>
                    <Clock4 size={14} />
                    <p>March 15, 2025</p>
                  </div>
                  <div className={"flex items-center gap-2"}>
                    <Eye size={14} />
                    <p>1,247</p>
                  </div>
                </div>
              </div>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-text-sub cursor-pointer hover:bg-transparent"
                    aria-label="More options"
                  >
                    <MoreHorizontalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="end">
                  <DropdownMenuLabel>File Actions</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>New File...</DropdownMenuItem>
                    <DropdownMenuItem>Share...</DropdownMenuItem>
                    <DropdownMenuItem disabled>Download</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <Separator />

          <div>
            <p className={"mb-4"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A architecto, autem
              consectetur consequatur culpa, debitis eius exercitationem fuga fugiat hic impedit
              incidunt, minus natus possimus provident quas sequi similique sint.
            </p>
            <span className={"text-base"}>Setlist Highlights</span>
            <br />
            <br />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus expedita,
              molestiae. Aut eaque et fugit incidunt necessitatibus obcaecati possimus quisquam,
              repellat veniam. Ad cumque iste itaque pariatur quidem sit vel. top.
            </p>
            <br />
            <div className={"flex h-100 items-center justify-center bg-gray-300"}>
              <span className={"text-text-sub"}>Concert Stage Photo</span>
            </div>
          </div>

          <Separator />
          <div>
            <Button variant={"outline"}>
              <Heart /> 124
            </Button>
          </div>

          <Separator />

          <div className={"flex flex-col gap-6"}>
            <div className={"flex justify-between"}>
              <h3 className={"text-xl font-bold"}>Comments (38)</h3>
              <SortSelect />
            </div>
            <div className={"flex gap-4"}>
              <Avatar className={"h-10 w-10"}>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className={"flex flex-1 flex-col gap-3"}>
                <Textarea className={"h-24 resize-none"} />
                <div className={"flex justify-between"}>
                  <span className={"text-text-sub text-sm"}>Be respectful and constructive</span>
                  <Button size={"lg"}>Post Comment</Button>
                </div>
              </div>
            </div>

            <Separator />

            <div className={"flex gap-4 border-b pb-6"}>
              <Avatar className={"h-10 w-10"}>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className={"flex flex-1 flex-col gap-2"}>
                <div className={"flex items-center justify-between"}>
                  <div className={"flex items-center gap-4"}>
                    <span>Lee Min-ho</span>
                    <span className={"text-text-sub text-xs"}>2 hours age</span>
                  </div>
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-text-sub cursor-pointer hover:bg-transparent"
                        aria-label="More options"
                      >
                        <MoreHorizontalIcon />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40" align="end">
                      <DropdownMenuLabel>File Actions</DropdownMenuLabel>
                      <DropdownMenuGroup>
                        <DropdownMenuItem>New File...</DropdownMenuItem>
                        <DropdownMenuItem>Share...</DropdownMenuItem>
                        <DropdownMenuItem disabled>Download</DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus asperiores
                  beatae, deserunt distinctio dolor eveniet ex explicabo id illum mollitia
                  necessitatibus neque nesciunt nihil odit omnis quidem vel, vero voluptate.
                </p>
                <div className={"text-text-sub flex items-center gap-1 text-xs"}>
                  <Heart size={12} />
                  12
                </div>
              </div>
            </div>

            <div className={"flex justify-center"}>
              <Button variant={"outline"} size={"lg"}>
                Load More Comments
              </Button>
            </div>
          </div>
        </section>
        {/*오른쪽 파트*/}
        <div className={"sticky top-34 flex w-125 shrink-0 flex-col gap-12 self-start"}>
          <QuickStat />
          <HotTrack />
          <SimilarArtists />
        </div>
      </div>
    </section>
  );
}
