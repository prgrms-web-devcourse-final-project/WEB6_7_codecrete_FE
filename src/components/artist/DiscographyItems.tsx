import Image from "next/image";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

// TODO: 나중에 이미지 url 모두 바꾸기
// TODO: 실제 api 통신을 통해 데이터가 들어오면 mock 데이터 지우고 구현하기
const music = [
  {
    album: "Beauty Behind the Madness",
    type: "Full Album",
    total_tracks: 12,
    releasedDate: "2008",
    imageSrc: "/The_Weeknd_-_Beauty_Behind_the_Madness.png",
    externalURL: "https://open.spotify.com/album/0P3oVJBFOv3TDXlYRhGL7s?si=X5iVFAKRSo6tpsQBXW4nSg",
  },
  {
    album: "After Hours",
    type: "Compilation",
    total_tracks: 12,
    releasedDate: "2015",
    imageSrc: "/The_Weeknd_-_After_Hours.png",
    externalURL: "https://open.spotify.com/album/4yP0hdKOZPNshxUOjY0cZj?si=1UcOK7CgROWndyrM_MnS8g",
  },
  {
    album: "Madvillainy",
    type: "Full Album",
    total_tracks: 12,
    releasedDate: "2021",
    imageSrc: "/Madvillainy_cover.png",
    externalURL: "https://open.spotify.com/album/19bQiwEKhXUBJWY6oV3KZk?si=XhVEgnlkS66484cbcrERwg",
  },
];

export function DiscographyItems() {
  return (
    <div className="flex w-full flex-col">
      <ItemGroup className="w-full gap-6">
        {music.map((song) => (
          <Item
            key={song.album}
            className={"flex w-full gap-6 p-6"}
            variant="outline"
            role="listitem"
          >
            <ItemMedia variant="image" className={"h-24 w-24 shrink-0"}>
              <Image fill src={song.imageSrc} alt={song.album} className="object-cover" />
            </ItemMedia>
            <div className={"flex flex-col gap-2"}>
              <ItemContent>
                <ItemTitle className={"text-lg"}>{song.album}</ItemTitle>
              </ItemContent>
              <ItemContent>
                <ItemDescription className={"text-sm"}>
                  {song.type} · {song.releasedDate} · {song.total_tracks} tracks
                </ItemDescription>
              </ItemContent>
              <ItemContent>
                {/*TODO: 이후 스포티파이 이미지 불러오기*/}
                <a href={song.externalURL} target="_blank" rel="noopener noreferrer">
                  Listen on Spotify
                </a>
              </ItemContent>
            </div>
          </Item>
        ))}
      </ItemGroup>
    </div>
  );
}
